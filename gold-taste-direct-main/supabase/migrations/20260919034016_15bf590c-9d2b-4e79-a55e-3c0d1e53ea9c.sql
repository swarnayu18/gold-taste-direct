DROP POLICY "Public can view active products" ON public.products;
CREATE POLICY "Anon can view active products" ON public.products FOR SELECT TO anon USING (is_active);
CREATE POLICY "Signed in can view products" ON public.products FOR SELECT TO authenticated USING (is_active OR public.has_role(auth.uid(),'admin'));

DROP POLICY "Public can view gallery" ON public.gallery;
CREATE POLICY "Anon can view gallery" ON public.gallery FOR SELECT TO anon USING (is_active);
CREATE POLICY "Signed in can view gallery" ON public.gallery FOR SELECT TO authenticated USING (is_active OR public.has_role(auth.uid(),'admin'));

DROP POLICY "Public can view testimonials" ON public.testimonials;
CREATE POLICY "Anon can view testimonials" ON public.testimonials FOR SELECT TO anon USING (is_active);
CREATE POLICY "Signed in can view testimonials" ON public.testimonials FOR SELECT TO authenticated USING (is_active OR public.has_role(auth.uid(),'admin'));

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.generate_order_code() FROM anon, authenticated;