import { o as formatINR, t as BRAND } from "./brand-DAhpdDak.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-BFqeEf5p.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-Bp4shyxJ.js
function useProducts(includeInactive = false) {
	return useQuery({
		queryKey: ["products", includeInactive],
		queryFn: async () => {
			let query = supabase.from("products").select("*, product_variants(*)").order("sort_order", { ascending: true });
			if (!includeInactive) query = query.eq("is_active", true);
			const { data, error } = await query;
			if (error) throw error;
			return (data ?? []).map((p) => ({
				...p,
				product_variants: [...p.product_variants ?? []].sort((a, b) => a.sort_order - b.sort_order)
			}));
		}
	});
}
function useProduct(slug) {
	return useQuery({
		queryKey: ["product", slug],
		queryFn: async () => {
			const { data, error } = await supabase.from("products").select("*, product_variants(*)").eq("slug", slug).maybeSingle();
			if (error) throw error;
			if (!data) return null;
			return {
				...data,
				product_variants: [...data.product_variants ?? []].sort((a, b) => a.sort_order - b.sort_order)
			};
		}
	});
}
var DEFAULT_UPI = {
	upi_id: "YOUR-UPI-ID@upi",
	merchant_name: BRAND.name,
	qr_image_url: "",
	is_placeholder: true
};
var DEFAULT_DELIVERY = {
	malda_fee: 0,
	outside_fee: 0,
	malda_eta: "1–2 days",
	outside_eta: "2–3 days",
	minimum_order: 0
};
var DEFAULT_CONTACT = {
	phone: BRAND.phone,
	whatsapp: BRAND.whatsapp,
	email: BRAND.email,
	address: BRAND.address,
	maps_embed_url: ""
};
function useSettings() {
	return useQuery({
		queryKey: ["site_settings"],
		queryFn: async () => {
			const { data, error } = await supabase.from("site_settings").select("key, value");
			if (error) throw error;
			const map = new Map((data ?? []).map((row) => [row.key, row.value]));
			return {
				upi: {
					...DEFAULT_UPI,
					...map.get("upi") ?? {}
				},
				delivery: {
					...DEFAULT_DELIVERY,
					...map.get("delivery") ?? {}
				},
				contact: {
					...DEFAULT_CONTACT,
					...map.get("contact") ?? {}
				}
			};
		}
	});
}
function useSaveSetting() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ key, value }) => {
			const { error } = await supabase.from("site_settings").upsert({
				key,
				value,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			});
			if (error) throw error;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["site_settings"] })
	});
}
function useGallery(includeInactive = false) {
	return useQuery({
		queryKey: ["gallery", includeInactive],
		queryFn: async () => {
			let query = supabase.from("gallery").select("*").order("sort_order", { ascending: true });
			if (!includeInactive) query = query.eq("is_active", true);
			const { data, error } = await query;
			if (error) throw error;
			return data ?? [];
		}
	});
}
function useTestimonials(includeInactive = false) {
	return useQuery({
		queryKey: ["testimonials", includeInactive],
		queryFn: async () => {
			let query = supabase.from("testimonials").select("*").order("sort_order", { ascending: true });
			if (!includeInactive) query = query.eq("is_active", true);
			const { data, error } = await query;
			if (error) throw error;
			return data ?? [];
		}
	});
}
function deliveryFeeFor(zone, settings) {
	const s = settings ?? DEFAULT_DELIVERY;
	return Number(zone === "malda_town" ? s.malda_fee : s.outside_fee) || 0;
}
function etaFor(zone, settings) {
	const s = settings ?? DEFAULT_DELIVERY;
	return zone === "malda_town" ? s.malda_eta : s.outside_eta;
}
function zoneLabel(zone) {
	return zone === "malda_town" ? "Malda Town" : "Outside Malda Town";
}
async function placeOrder(draft) {
	const d = draft.details;
	const { data: order, error } = await supabase.from("orders").insert({
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
		order_status: "payment_verification"
	}).select("id, order_code, created_at").single();
	if (error) throw error;
	const { error: itemsError } = await supabase.from("order_items").insert(draft.lines.map((l) => ({
		order_id: order.id,
		product_id: l.productId,
		product_name: l.name,
		weight_label: l.weightLabel,
		unit_price: l.price,
		quantity: l.quantity,
		line_total: l.price * l.quantity
	})));
	if (itemsError) throw itemsError;
	return {
		orderCode: order.order_code,
		createdAt: order.created_at
	};
}
function buildOrderWhatsAppMessage(args) {
	const { orderCode, draft } = args;
	const d = draft.details;
	const items = draft.lines.map((l) => `${l.name} - ${l.weightLabel} × ${l.quantity}`).join("\n");
	const address = [
		d.address,
		d.area,
		d.city,
		d.state,
		d.pincode
	].filter(Boolean).join(", ");
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
		"Gold Taste Customer"
	].join("\n");
}
async function trackOrder(orderCode, mobile) {
	const { data, error } = await supabase.rpc("track_order", {
		p_order_code: orderCode,
		p_mobile: mobile
	});
	if (error) throw error;
	return data ?? null;
}
function upiDeepLink(args) {
	return `upi://pay?${new URLSearchParams({
		pa: args.upiId,
		pn: args.merchantName,
		am: String(Math.round(args.amount)),
		cu: "INR",
		tn: args.note
	}).toString()}`;
}
function useAdminOrders() {
	return useQuery({
		queryKey: ["admin_orders"],
		queryFn: async () => {
			const { data, error } = await supabase.from("orders").select("*, order_items(*)").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
}
function useUpdateOrder() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ id, payment_status, order_status, admin_notes }) => {
			const updates = {};
			if (payment_status !== void 0) updates.payment_status = payment_status;
			if (order_status !== void 0) updates.order_status = order_status;
			if (admin_notes !== void 0) updates.admin_notes = admin_notes;
			const { error } = await supabase.from("orders").update(updates).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["admin_orders"] });
		}
	});
}
function useCreateProduct() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (payload) => {
			const { variants, ...productData } = payload;
			const { data: product, error } = await supabase.from("products").insert(productData).select("id").single();
			if (error) throw error;
			if (variants && variants.length > 0) {
				const { error: vErr } = await supabase.from("product_variants").insert(variants.map((v) => ({
					product_id: product.id,
					weight_label: v.weight_label,
					price: v.price,
					sort_order: v.sort_order
				})));
				if (vErr) throw vErr;
			}
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["products"] });
		}
	});
}
function useUpdateProduct() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (payload) => {
			const { id, variants, ...productUpdates } = payload;
			if (Object.keys(productUpdates).length > 0) {
				const { error } = await supabase.from("products").update(productUpdates).eq("id", id);
				if (error) throw error;
			}
			if (variants) for (const v of variants) if (v.id) {
				const { error: vErr } = await supabase.from("product_variants").update({
					weight_label: v.weight_label,
					price: v.price,
					sort_order: v.sort_order,
					is_active: v.is_active ?? true
				}).eq("id", v.id);
				if (vErr) throw vErr;
			} else {
				const { error: vErr } = await supabase.from("product_variants").insert({
					product_id: id,
					weight_label: v.weight_label,
					price: v.price,
					sort_order: v.sort_order,
					is_active: v.is_active ?? true
				});
				if (vErr) throw vErr;
			}
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["products"] });
			qc.invalidateQueries({ queryKey: ["product"] });
		}
	});
}
function useDeleteProduct() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (productId) => {
			const { error } = await supabase.from("products").delete().eq("id", productId);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["products"] });
		}
	});
}
function useCreateGalleryItem() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (item) => {
			const { error } = await supabase.from("gallery").insert(item);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["gallery"] });
		}
	});
}
function useDeleteGalleryItem() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("gallery").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["gallery"] });
		}
	});
}
function useCreateTestimonial() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (item) => {
			const { error } = await supabase.from("testimonials").insert(item);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["testimonials"] });
		}
	});
}
function useDeleteTestimonial() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("testimonials").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["testimonials"] });
		}
	});
}
//#endregion
export { zoneLabel as S, useSaveSetting as _, trackOrder as a, useUpdateOrder as b, useCreateGalleryItem as c, useDeleteGalleryItem as d, useDeleteProduct as f, useProducts as g, useProduct as h, placeOrder as i, useCreateProduct as l, useGallery as m, deliveryFeeFor as n, upiDeepLink as o, useDeleteTestimonial as p, etaFor as r, useAdminOrders as s, buildOrderWhatsAppMessage as t, useCreateTestimonial as u, useSettings as v, useUpdateProduct as x, useTestimonials as y };
