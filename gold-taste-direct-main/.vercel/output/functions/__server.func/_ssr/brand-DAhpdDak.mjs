//#region node_modules/.nitro/vite/services/ssr/assets/brand-DAhpdDak.js
var gajar_halwa_default = "/assets/gajar-halwa-D_QVaSHV.jpg";
var suji_halwa_default = "/assets/suji-halwa-oJ6b-7A9.jpg";
var moong_dal_halwa_default = "/assets/moong-dal-halwa-BdhC-Bx4.jpg";
var besan_halwa_default = "/assets/besan-halwa-DDYPFg8W.jpg";
var dry_fruit_halwa_default = "/assets/dry-fruit-halwa-DQLb-b_k.jpg";
var special_halwa_default = "/assets/special-halwa-BaUPBi7I.jpg";
var hero_halwa_default = "/assets/hero-halwa-DjRkvddG.jpg";
var packaging_default = "/assets/packaging-D2Xej-AC.jpg";
var ingredients_default = "/assets/ingredients-fC-WERPe.jpg";
var gold_taste_logo_default = "/assets/gold-taste-logo-Cv5oA7vz.png";
var BRAND = {
	name: "Gold Taste",
	tagline: "Premium Halwa",
	secondaryTagline: "Traditional Taste • Rich in Flavour",
	address: "Ar Ki Mirchok Road, Malda, West Bengal",
	phone: "9547897607",
	whatsapp: "9547897607",
	email: "goldtaste26@gmail.com"
};
var logoImage = gold_taste_logo_default;
var heroImage = hero_halwa_default;
var packagingImage = packaging_default;
var ingredientsImage = ingredients_default;
/** Local fallback photography, used when a product has no admin-set image URL. */
var fallbackProductImages = {
	"gajar-halwa": gajar_halwa_default,
	"suji-halwa": suji_halwa_default,
	"moong-dal-halwa": moong_dal_halwa_default,
	"besan-halwa": besan_halwa_default,
	"dry-fruit-halwa": dry_fruit_halwa_default,
	"special-gold-taste-halwa": special_halwa_default
};
function productImage(slug, imageUrl) {
	if (imageUrl && imageUrl.trim().length > 0) return imageUrl;
	return fallbackProductImages[slug] ?? "/assets/special-halwa-BaUPBi7I.jpg";
}
var defaultGallery = [
	{
		image_url: hero_halwa_default,
		caption: "Gajar halwa, freshly prepared"
	},
	{
		image_url: packaging_default,
		caption: "Carefully packed for gifting"
	},
	{
		image_url: special_halwa_default,
		caption: "Special Gold Taste halwa"
	},
	{
		image_url: ingredients_default,
		caption: "Ingredients we cook with"
	},
	{
		image_url: moong_dal_halwa_default,
		caption: "Moong dal halwa"
	},
	{
		image_url: gold_taste_logo_default,
		caption: "Gold Taste"
	}
];
/** 10-digit Indian number -> 91XXXXXXXXXX for wa.me links (not shown to users). */
function toInternational(number) {
	return `91${number.replace(/\D/g, "").slice(-10)}`;
}
function whatsappLink(message, number = BRAND.whatsapp) {
	return `https://wa.me/${toInternational(number)}?text=${encodeURIComponent(message)}`;
}
var HELP_MESSAGE = `Hello Gold Taste 👋 I have a question about your halwa.`;
function formatINR(amount) {
	return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(amount))}`;
}
function isValidIndianMobile(value) {
	return /^[6-9]\d{9}$/.test(value.replace(/\D/g, ""));
}
function isValidPincode(value) {
	return /^\d{6}$/.test(value.replace(/\D/g, ""));
}
var ORDER_STATUS_LABELS = {
	pending: "Payment Pending",
	payment_verification: "Payment Verification",
	confirmed: "Confirmed",
	preparing: "Preparing",
	ready: "Ready for Dispatch",
	dispatched: "Out for Delivery",
	delivered: "Delivered",
	cancelled: "Cancelled"
};
var PAYMENT_STATUS_LABELS = {
	pending: "Pending",
	paid_by_customer: "Paid by customer (awaiting verification)",
	verified: "Verified",
	rejected: "Rejected"
};
//#endregion
export { defaultGallery as a, ingredientsImage as c, logoImage as d, packagingImage as f, PAYMENT_STATUS_LABELS as i, isValidIndianMobile as l, whatsappLink as m, HELP_MESSAGE as n, formatINR as o, productImage as p, ORDER_STATUS_LABELS as r, heroImage as s, BRAND as t, isValidPincode as u };
