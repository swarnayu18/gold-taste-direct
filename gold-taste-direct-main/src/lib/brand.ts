import gajar from "@/assets/gajar-halwa.jpg";
import suji from "@/assets/suji-halwa.jpg";
import moong from "@/assets/moong-dal-halwa.jpg";
import besan from "@/assets/besan-halwa.jpg";
import dryFruit from "@/assets/dry-fruit-halwa.jpg";
import special from "@/assets/special-halwa.jpg";
import hero from "@/assets/hero-halwa.jpg";
import packaging from "@/assets/packaging.jpg";
import ingredients from "@/assets/ingredients.jpg";
import logo from "@/assets/gold-taste-logo.png";

export const BRAND = {
  name: "Gold Taste",
  tagline: "Premium Halwa",
  secondaryTagline: "Traditional Taste • Rich in Flavour",
  address: "Ar Ki Mirchok Road, Malda, West Bengal",
  phone: "9547897607",
  whatsapp: "9547897607",
  email: "goldtaste26@gmail.com",
} as const;

export const logoImage = logo;
export const heroImage = hero;
export const packagingImage = packaging;
export const ingredientsImage = ingredients;

/** Local fallback photography, used when a product has no admin-set image URL. */
export const fallbackProductImages: Record<string, string> = {
  "gajar-halwa": gajar,
  "suji-halwa": suji,
  "moong-dal-halwa": moong,
  "besan-halwa": besan,
  "dry-fruit-halwa": dryFruit,
  "special-gold-taste-halwa": special,
};

export function productImage(slug: string, imageUrl?: string | null) {
  if (imageUrl && imageUrl.trim().length > 0) return imageUrl;
  return fallbackProductImages[slug] ?? special;
}

export const defaultGallery = [
  { image_url: hero, caption: "Gajar halwa, freshly prepared" },
  { image_url: packaging, caption: "Carefully packed for gifting" },
  { image_url: special, caption: "Special Gold Taste halwa" },
  { image_url: ingredients, caption: "Ingredients we cook with" },
  { image_url: moong, caption: "Moong dal halwa" },
  { image_url: logo, caption: "Gold Taste" },
];

/** 10-digit Indian number -> 91XXXXXXXXXX for wa.me links (not shown to users). */
export function toInternational(number: string) {
  const digits = number.replace(/\D/g, "");
  const last10 = digits.slice(-10);
  return `91${last10}`;
}

export function whatsappLink(message: string, number: string = BRAND.whatsapp) {
  return `https://wa.me/${toInternational(number)}?text=${encodeURIComponent(message)}`;
}

export const HELP_MESSAGE = `Hello Gold Taste 👋 I have a question about your halwa.`;

export function formatINR(amount: number) {
  return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Math.round(amount),
  )}`;
}

export function isValidIndianMobile(value: string) {
  return /^[6-9]\d{9}$/.test(value.replace(/\D/g, ""));
}

export function isValidPincode(value: string) {
  return /^\d{6}$/.test(value.replace(/\D/g, ""));
}

export const ORDER_STATUS_FLOW = [
  "pending",
  "payment_verification",
  "confirmed",
  "preparing",
  "ready",
  "dispatched",
  "delivered",
] as const;

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: "Payment Pending",
  payment_verification: "Payment Verification",
  confirmed: "Confirmed",
  preparing: "Preparing",
  ready: "Ready for Dispatch",
  dispatched: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  paid_by_customer: "Paid by customer (awaiting verification)",
  verified: "Verified",
  rejected: "Rejected",
};
