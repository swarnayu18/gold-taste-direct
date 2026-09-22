export type ProductVariant = {
  id: string;
  product_id: string;
  weight_label: string;
  price: number;
  is_active: boolean;
  sort_order: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  description: string;
  ingredients: string;
  image_url: string | null;
  is_active: boolean;
  is_featured: boolean;
  in_stock: boolean;
  price_is_placeholder: boolean;
  sort_order: number;
  product_variants: ProductVariant[];
};

export type UpiSettings = {
  upi_id: string;
  merchant_name: string;
  qr_image_url: string;
  is_placeholder: boolean;
};

export type DeliverySettings = {
  malda_fee: number;
  outside_fee: number;
  malda_eta: string;
  outside_eta: string;
  minimum_order: number;
};

export type ContactSettings = {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  maps_embed_url: string;
};

export type DeliveryZone = "malda_town" | "outside_malda";

export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  weightLabel: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
};

export type CheckoutDetails = {
  fullName: string;
  mobile: string;
  whatsapp: string;
  email: string;
  address: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  zone: DeliveryZone;
};

export type OrderDraft = {
  details: CheckoutDetails;
  lines: CartLine[];
  subtotal: number;
  deliveryFee: number;
  total: number;
};

export type PlacedOrder = OrderDraft & {
  orderCode: string;
  createdAt: string;
};
