import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BRAND, formatINR } from "./brand";
import type {
  ContactSettings,
  DeliverySettings,
  DeliveryZone,
  OrderDraft,
  Product,
  UpiSettings,
} from "./types";

/* ------------------------------ public reads ----------------------------- */

export function useProducts(includeInactive = false) {
  return useQuery({
    queryKey: ["products", includeInactive],
    queryFn: async (): Promise<Product[]> => {
      let query = supabase
        .from("products")
        .select("*, product_variants(*)")
        .order("sort_order", { ascending: true });
      if (!includeInactive) query = query.eq("is_active", true);
      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []).map((p) => ({
        ...p,
        product_variants: [...(p.product_variants ?? [])].sort(
          (a, b) => a.sort_order - b.sort_order,
        ),
      })) as Product[];
    },
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: async (): Promise<Product | null> => {
      const { data, error } = await supabase
        .from("products")
        .select("*, product_variants(*)")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return {
        ...data,
        product_variants: [...(data.product_variants ?? [])].sort(
          (a, b) => a.sort_order - b.sort_order,
        ),
      } as Product;
    },
  });
}

const DEFAULT_UPI: UpiSettings = {
  upi_id: "YOUR-UPI-ID@upi",
  merchant_name: BRAND.name,
  qr_image_url: "",
  is_placeholder: true,
};

const DEFAULT_DELIVERY: DeliverySettings = {
  malda_fee: 0,
  outside_fee: 0,
  malda_eta: "1–2 days",
  outside_eta: "2–3 days",
  minimum_order: 0,
};

const DEFAULT_CONTACT: ContactSettings = {
  phone: BRAND.phone,
  whatsapp: BRAND.whatsapp,
  email: BRAND.email,
  address: BRAND.address,
  maps_embed_url: "",
};

export function useSettings() {
  return useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("key, value");
      if (error) throw error;
      const map = new Map((data ?? []).map((row) => [row.key, row.value as unknown]));
      return {
        upi: { ...DEFAULT_UPI, ...((map.get("upi") as Partial<UpiSettings>) ?? {}) },
        delivery: {
          ...DEFAULT_DELIVERY,
          ...((map.get("delivery") as Partial<DeliverySettings>) ?? {}),
        },
        contact: { ...DEFAULT_CONTACT, ...((map.get("contact") as Partial<ContactSettings>) ?? {}) },
      };
    },
  });
}

export function useSaveSetting() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: unknown }) => {
      const { error } = await supabase
        .from("site_settings")
        .upsert({ key, value: value as never, updated_at: new Date().toISOString() });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["site_settings"] }),
  });
}

export function useGallery(includeInactive = false) {
  return useQuery({
    queryKey: ["gallery", includeInactive],
    queryFn: async () => {
      let query = supabase.from("gallery").select("*").order("sort_order", { ascending: true });
      if (!includeInactive) query = query.eq("is_active", true);
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useTestimonials(includeInactive = false) {
  return useQuery({
    queryKey: ["testimonials", includeInactive],
    queryFn: async () => {
      let query = supabase.from("testimonials").select("*").order("sort_order", { ascending: true });
      if (!includeInactive) query = query.eq("is_active", true);
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
  });
}

/* ------------------------------- delivery -------------------------------- */

export function deliveryFeeFor(zone: DeliveryZone, settings?: DeliverySettings) {
  const s = settings ?? DEFAULT_DELIVERY;
  return Number(zone === "malda_town" ? s.malda_fee : s.outside_fee) || 0;
}

export function etaFor(zone: DeliveryZone, settings?: DeliverySettings) {
  const s = settings ?? DEFAULT_DELIVERY;
  return zone === "malda_town" ? s.malda_eta : s.outside_eta;
}

export function zoneLabel(zone: DeliveryZone) {
  return zone === "malda_town" ? "Malda Town" : "Outside Malda Town";
}

/* -------------------------------- orders --------------------------------- */

export async function placeOrder(draft: OrderDraft) {
  const d = draft.details;
  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      customer_name: d.fullName.trim(),
      mobile: d.mobile.replace(/\D/g, "").slice(-10),
      whatsapp: (d.whatsapp || d.mobile).replace(/\D/g, "").slice(-10),
      email: d.email.trim() || null,
      address: d.address.trim(),
      area: d.area.trim(),
      city: d.city.trim(),
      state: d.state.trim(),
      pincode: d.pincode.replace(/\D/g, ""),
      delivery_zone: d.zone,
      subtotal: draft.subtotal,
      delivery_fee: draft.deliveryFee,
      total: draft.total,
      payment_method: "upi",
      payment_status: "paid_by_customer",
      order_status: "payment_verification",
    })
    .select("id, order_code, created_at")
    .single();
  if (error) throw error;

  const { error: itemsError } = await supabase.from("order_items").insert(
    draft.lines.map((l) => ({
      order_id: order.id,
      product_id: l.productId,
      product_name: l.name,
      weight_label: l.weightLabel,
      unit_price: l.price,
      quantity: l.quantity,
      line_total: l.price * l.quantity,
    })),
  );
  if (itemsError) throw itemsError;

  return { orderCode: order.order_code as string, createdAt: order.created_at as string };
}

export function buildOrderWhatsAppMessage(args: {
  orderCode: string;
  draft: OrderDraft;
}) {
  const { orderCode, draft } = args;
  const d = draft.details;
  const items = draft.lines
    .map((l) => `${l.name} - ${l.weightLabel} × ${l.quantity}`)
    .join("\n");
  const address = [d.address, d.area, d.city, d.state, d.pincode].filter(Boolean).join(", ");

  return [
    "Hello Gold Taste 👋",
    "",
    "I would like to confirm my order.",
    "",
    `Order ID: ${orderCode}`,
    "",
    "Customer:",
    d.fullName,
    "",
    "Mobile:",
    d.mobile,
    "",
    "Delivery Address:",
    address,
    "",
    `Delivery Area: ${zoneLabel(d.zone)}`,
    "",
    "Products:",
    items,
    "",
    "Subtotal:",
    formatINR(draft.subtotal),
    "",
    "Delivery:",
    formatINR(draft.deliveryFee),
    "",
    "Total:",
    formatINR(draft.total),
    "",
    "Payment Method:",
    "UPI",
    "",
    "Payment Status:",
    "Paid by customer",
    "",
    "Please verify my payment and confirm the order.",
    "",
    "Thank you,",
    "Gold Taste Customer",
  ].join("\n");
}

/* -------------------------------- tracking ------------------------------- */

export type TrackedOrder = {
  order_code: string;
  customer_name: string;
  delivery_zone: DeliveryZone;
  subtotal: number;
  delivery_fee: number;
  total: number;
  payment_status: string;
  order_status: string;
  created_at: string;
  items: { product_name: string; weight_label: string; quantity: number; line_total: number }[];
};

export async function trackOrder(orderCode: string, mobile: string) {
  const { data, error } = await supabase.rpc("track_order", {
    p_order_code: orderCode,
    p_mobile: mobile,
  });
  if (error) throw error;
  return (data as unknown as TrackedOrder | null) ?? null;
}

/* ------------------------------ upi deep link ---------------------------- */

export function upiDeepLink(args: {
  upiId: string;
  merchantName: string;
  amount: number;
  note: string;
}) {
  const params = new URLSearchParams({
    pa: args.upiId,
    pn: args.merchantName,
    am: String(Math.round(args.amount)),
    cu: "INR",
    tn: args.note,
  });
  return `upi://pay?${params.toString()}`;
}

/* -------------------------------- admin hooks ---------------------------- */

export type AdminOrder = {
  id: string;
  order_code: string;
  customer_name: string;
  mobile: string;
  whatsapp: string;
  email: string | null;
  address: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  delivery_zone: string;
  subtotal: number;
  delivery_fee: number;
  total: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
  order_items: {
    id: string;
    product_id: string | null;
    product_name: string;
    weight_label: string;
    unit_price: number;
    quantity: number;
    line_total: number;
  }[];
};

export function useAdminOrders() {
  return useQuery({
    queryKey: ["admin_orders"],
    queryFn: async (): Promise<AdminOrder[]> => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as AdminOrder[];
    },
  });
}

export function useUpdateOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      payment_status,
      order_status,
      admin_notes,
    }: {
      id: string;
      payment_status?: string;
      order_status?: string;
      admin_notes?: string;
    }) => {
      const updates: Record<string, unknown> = {};
      if (payment_status !== undefined) updates.payment_status = payment_status;
      if (order_status !== undefined) updates.order_status = order_status;
      if (admin_notes !== undefined) updates.admin_notes = admin_notes;

      const { error } = await supabase.from("orders").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin_orders"] });
    },
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      name: string;
      slug: string;
      short_description: string;
      description: string;
      ingredients: string;
      image_url?: string;
      is_active: boolean;
      is_featured: boolean;
      in_stock: boolean;
      price_is_placeholder: boolean;
      sort_order?: number;
      variants: { weight_label: string; price: number; sort_order: number }[];
    }) => {
      const { variants, ...productData } = payload;
      const { data: product, error } = await supabase
        .from("products")
        .insert(productData)
        .select("id")
        .single();
      if (error) throw error;

      if (variants && variants.length > 0) {
        const { error: vErr } = await supabase.from("product_variants").insert(
          variants.map((v) => ({
            product_id: product.id,
            weight_label: v.weight_label,
            price: v.price,
            sort_order: v.sort_order,
          })),
        );
        if (vErr) throw vErr;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      id: string;
      name?: string;
      short_description?: string;
      description?: string;
      ingredients?: string;
      image_url?: string | null;
      is_active?: boolean;
      is_featured?: boolean;
      in_stock?: boolean;
      price_is_placeholder?: boolean;
      sort_order?: number;
      variants?: { id?: string; weight_label: string; price: number; sort_order: number; is_active?: boolean }[];
    }) => {
      const { id, variants, ...productUpdates } = payload;
      if (Object.keys(productUpdates).length > 0) {
        const { error } = await supabase.from("products").update(productUpdates).eq("id", id);
        if (error) throw error;
      }

      if (variants) {
        for (const v of variants) {
          if (v.id) {
            const { error: vErr } = await supabase
              .from("product_variants")
              .update({
                weight_label: v.weight_label,
                price: v.price,
                sort_order: v.sort_order,
                is_active: v.is_active ?? true,
              })
              .eq("id", v.id);
            if (vErr) throw vErr;
          } else {
            const { error: vErr } = await supabase.from("product_variants").insert({
              product_id: id,
              weight_label: v.weight_label,
              price: v.price,
              sort_order: v.sort_order,
              is_active: v.is_active ?? true,
            });
            if (vErr) throw vErr;
          }
        }
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.invalidateQueries({ queryKey: ["product"] });
    },
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (productId: string) => {
      const { error } = await supabase.from("products").delete().eq("id", productId);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useCreateGalleryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: { image_url: string; caption: string; sort_order?: number }) => {
      const { error } = await supabase.from("gallery").insert(item);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
}

export function useDeleteGalleryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("gallery").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
}

export function useCreateTestimonial() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: { name: string; location: string; message: string; sort_order?: number }) => {
      const { error } = await supabase.from("testimonials").insert(item);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
}

export function useDeleteTestimonial() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
}
