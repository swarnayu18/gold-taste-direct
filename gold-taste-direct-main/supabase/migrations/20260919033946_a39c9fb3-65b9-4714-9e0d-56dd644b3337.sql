-- roles
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- products
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  short_description text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  ingredients text NOT NULL DEFAULT '',
  image_url text,
  is_active boolean NOT NULL DEFAULT true,
  is_featured boolean NOT NULL DEFAULT false,
  in_stock boolean NOT NULL DEFAULT true,
  price_is_placeholder boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active products" ON public.products FOR SELECT TO anon, authenticated USING (is_active OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage products" ON public.products FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.product_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  weight_label text NOT NULL,
  price numeric(10,2) NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.product_variants TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.product_variants TO authenticated;
GRANT ALL ON public.product_variants TO service_role;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view variants" ON public.product_variants FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage variants" ON public.product_variants FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- orders
CREATE SEQUENCE public.order_seq START 1;

CREATE OR REPLACE FUNCTION public.generate_order_code() RETURNS text LANGUAGE sql VOLATILE SET search_path = public AS $$
  SELECT 'GT-' || to_char(now(),'YYYYMMDD') || '-' || lpad((nextval('public.order_seq'))::text, 3, '0')
$$;

CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_code text NOT NULL UNIQUE DEFAULT public.generate_order_code(),
  customer_name text NOT NULL,
  mobile text NOT NULL,
  whatsapp text NOT NULL,
  email text,
  address text NOT NULL,
  area text NOT NULL DEFAULT '',
  city text NOT NULL DEFAULT '',
  state text NOT NULL DEFAULT '',
  pincode text NOT NULL DEFAULT '',
  delivery_zone text NOT NULL DEFAULT 'malda_town',
  subtotal numeric(10,2) NOT NULL DEFAULT 0,
  delivery_fee numeric(10,2) NOT NULL DEFAULT 0,
  total numeric(10,2) NOT NULL DEFAULT 0,
  payment_method text NOT NULL DEFAULT 'upi',
  payment_status text NOT NULL DEFAULT 'pending',
  order_status text NOT NULL DEFAULT 'pending',
  admin_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.orders TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can place an order" ON public.orders FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins view orders" ON public.orders FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update orders" ON public.orders FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete orders" ON public.orders FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  weight_label text NOT NULL,
  unit_price numeric(10,2) NOT NULL DEFAULT 0,
  quantity integer NOT NULL DEFAULT 1,
  line_total numeric(10,2) NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.order_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.order_items TO authenticated;
GRANT ALL ON public.order_items TO service_role;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can add order items" ON public.order_items FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins view order items" ON public.order_items FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage order items" ON public.order_items FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- customer order lookup (order code + mobile)
CREATE OR REPLACE FUNCTION public.track_order(p_order_code text, p_mobile text)
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE o public.orders; result jsonb;
BEGIN
  SELECT * INTO o FROM public.orders
  WHERE upper(order_code) = upper(trim(p_order_code))
    AND right(regexp_replace(mobile,'\D','','g'), 10) = right(regexp_replace(p_mobile,'\D','','g'), 10)
  LIMIT 1;
  IF o.id IS NULL THEN RETURN NULL; END IF;
  SELECT jsonb_build_object(
    'order_code', o.order_code,
    'customer_name', o.customer_name,
    'delivery_zone', o.delivery_zone,
    'subtotal', o.subtotal,
    'delivery_fee', o.delivery_fee,
    'total', o.total,
    'payment_status', o.payment_status,
    'order_status', o.order_status,
    'created_at', o.created_at,
    'items', COALESCE((SELECT jsonb_agg(jsonb_build_object('product_name', i.product_name, 'weight_label', i.weight_label, 'quantity', i.quantity, 'line_total', i.line_total) ORDER BY i.created_at) FROM public.order_items i WHERE i.order_id = o.id), '[]'::jsonb)
  ) INTO result;
  RETURN result;
END; $$;
GRANT EXECUTE ON FUNCTION public.track_order(text, text) TO anon, authenticated;

-- settings
CREATE TABLE public.site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage settings" ON public.site_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  caption text NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery TO authenticated;
GRANT ALL ON public.gallery TO service_role;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view gallery" ON public.gallery FOR SELECT TO anon, authenticated USING (is_active OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage gallery" ON public.gallery FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view testimonials" ON public.testimonials FOR SELECT TO anon, authenticated USING (is_active OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage testimonials" ON public.testimonials FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- seed settings
INSERT INTO public.site_settings (key, value) VALUES
 ('upi', '{"upi_id":"YOUR-UPI-ID@upi","merchant_name":"Gold Taste","qr_image_url":"","is_placeholder":true}'),
 ('delivery', '{"malda_fee":0,"outside_fee":0,"malda_eta":"1–2 days","outside_eta":"2–3 days","minimum_order":0}'),
 ('contact', '{"phone":"9547897607","whatsapp":"9547897607","email":"goldtaste26@gmail.com","address":"Ar Ki Mirchok Road, Malda, West Bengal","maps_embed_url":""}'),
 ('brand', '{"logo_url":"","hero_image_url":""}');

-- seed products
INSERT INTO public.products (slug, name, short_description, description, ingredients, is_featured, sort_order) VALUES
 ('gajar-halwa','Gajar Halwa','Slow-cooked carrot halwa, rich and warm.','Fresh carrots slow-cooked until deep and glossy, finished with ghee and cardamom for a classic winter favourite.','Carrot, milk, sugar, ghee, cardamom, dry fruits', true, 1),
 ('suji-halwa','Suji Halwa','Soft semolina halwa, light and fragrant.','A gently roasted semolina halwa with a soft texture and a delicate ghee aroma.','Semolina (suji), sugar, ghee, cardamom, dry fruits', false, 2),
 ('moong-dal-halwa','Moong Dal Halwa','Traditional moong dal halwa, deeply rich.','Moong dal roasted patiently in ghee for a dense, traditional halwa with a deep flavour.','Moong dal, sugar, ghee, milk, cardamom, dry fruits', true, 3),
 ('besan-halwa','Besan Halwa','Roasted gram flour halwa with a nutty finish.','Gram flour roasted low and slow for a nutty, comforting halwa.','Gram flour (besan), sugar, ghee, cardamom, dry fruits', false, 4),
 ('dry-fruit-halwa','Dry Fruit Halwa','Generously loaded with mixed dry fruits.','A festive halwa layered with almonds, cashews and raisins for a richer bite.','Milk, sugar, ghee, almonds, cashews, raisins, cardamom', true, 5),
 ('special-gold-taste-halwa','Special Gold Taste Halwa','Our signature house preparation.','Our house special halwa, prepared in small batches with our own blend of ingredients.','Prepared in-house; ingredient details available on request', true, 6);

INSERT INTO public.product_variants (product_id, weight_label, price, sort_order)
SELECT p.id, v.label, v.price, v.ord
FROM public.products p
CROSS JOIN (VALUES ('250g', 150.00, 1), ('500g', 280.00, 2), ('1kg', 540.00, 3)) AS v(label, price, ord);

INSERT INTO public.testimonials (name, location, message, sort_order) VALUES
 ('Placeholder review','Malda','Customer reviews will appear here. Edit or remove this from the admin dashboard.',1),
 ('Placeholder review','Malda','Customer reviews will appear here. Edit or remove this from the admin dashboard.',2),
 ('Placeholder review','Malda','Customer reviews will appear here. Edit or remove this from the admin dashboard.',3);