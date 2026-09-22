import { r as __toESM } from "../_runtime.mjs";
import { m as whatsappLink, o as formatINR } from "./brand-DAhpdDak.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as useCart } from "./router-BarUkpGL.mjs";
import { I as Copy, P as ExternalLink, V as Check, W as ArrowLeft, _ as QrCode, c as Smartphone, d as ShieldCheck } from "../_libs/lucide-react.mjs";
import { n as SiteLayout, t as PageHeader } from "./SiteLayout-Diear1rn.mjs";
import { i as placeOrder, o as upiDeepLink, t as buildOrderWhatsAppMessage, v as useSettings } from "./shop-Bp4shyxJ.mjs";
import { a as savePlacedOrder, n as loadDraft, t as clearDraft } from "./order-draft-6w9zsJjG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/payment-B0zNIC_k.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PaymentPage() {
	const navigate = useNavigate();
	const { clear } = useCart();
	const { data: settings } = useSettings();
	const draft = loadDraft();
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	if (!draft || draft.lines.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Payment",
		title: "No Active Order"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-md px-4 py-16 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "luxe-card p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-base text-foreground/90",
					children: "There is no active order ready for payment."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: "Please choose your halwa and proceed through checkout first."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/products",
					className: "mt-6 inline-flex rounded-full bg-gold px-7 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90",
					children: "Browse Halwa"
				})
			]
		})
	})] });
	const upiId = settings?.upi?.upi_id || "YOUR-UPI-ID@upi";
	const merchantName = settings?.upi?.merchant_name || "Gold Taste";
	const isPlaceholder = settings?.upi?.is_placeholder ?? true;
	const upiUrl = upiDeepLink({
		upiId,
		merchantName,
		amount: draft.total,
		note: `Gold Taste Halwa Order`
	});
	const qrImageUrl = settings?.upi?.qr_image_url && settings.upi.qr_image_url.trim().length > 0 ? settings.upi.qr_image_url : `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(upiUrl)}&bgcolor=1f1e1c&color=eed48f`;
	const copyUpiId = async () => {
		try {
			await navigator.clipboard.writeText(upiId);
			setCopied(true);
			toast.success("UPI ID copied to clipboard");
			setTimeout(() => setCopied(false), 2500);
		} catch {
			toast.info(`UPI ID: ${upiId}`);
		}
	};
	const handleConfirmOnWhatsApp = async () => {
		setSubmitting(true);
		try {
			const { orderCode, createdAt } = await placeOrder(draft);
			savePlacedOrder({
				...draft,
				orderCode,
				createdAt
			});
			clear();
			clearDraft();
			const waMessage = buildOrderWhatsAppMessage({
				orderCode,
				draft
			});
			const waUrl = whatsappLink(waMessage);
			window.open(waUrl, "_blank", "noopener,noreferrer");
			navigate({
				to: "/order-confirmation",
				search: { code: orderCode }
			});
		} catch (err) {
			console.error("Order submission failed:", err);
			toast.error("Could not automatically record order. You can still confirm directly via WhatsApp.");
			const fallbackCode = `GT-${Date.now().toString().slice(-6)}`;
			const waMessage = buildOrderWhatsAppMessage({
				orderCode: fallbackCode,
				draft
			});
			window.open(whatsappLink(waMessage), "_blank", "noopener,noreferrer");
			savePlacedOrder({
				...draft,
				orderCode: fallbackCode,
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			});
			clear();
			clearDraft();
			navigate({
				to: "/order-confirmation",
				search: { code: fallbackCode }
			});
		} finally {
			setSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Payment",
		title: "Complete Your Payment",
		subtitle: "Scan the UPI QR code or pay with your UPI app, then confirm on WhatsApp."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-3xl px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "luxe-card overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border bg-charcoal/80 p-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Order Total"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-4xl md:text-5xl font-serif text-gold",
						children: formatINR(draft.total)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: [
							"Includes ",
							formatINR(draft.deliveryFee),
							" delivery charge"
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 md:p-10 space-y-8",
				children: [
					isPlaceholder && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-gold/40 bg-gold/10 p-4 text-xs text-foreground/80 flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-gold shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-gold",
							children: "Configurable Demo UPI Notice:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 text-muted-foreground",
							children: [
								"This UPI ID (",
								upiId,
								") is an editable placeholder. The business owner can set their actual UPI ID and QR code in the Admin Dashboard at any time."
							]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium tracking-wide text-foreground/90",
							children: "Scan & Pay using any UPI app (GPay, PhonePe, Paytm, BHIM)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 inline-block rounded-3xl border-2 border-gold/40 bg-card p-4 shadow-gold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: qrImageUrl,
								alt: "UPI QR Code",
								className: "h-56 w-56 md:h-64 md:w-64 rounded-2xl object-contain mx-auto"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "h-3.5 w-3.5 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Scan to pay ", formatINR(draft.total)] })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-md rounded-2xl border border-border bg-charcoal p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wider text-muted-foreground",
								children: "UPI ID / VPA"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-sm font-semibold text-foreground truncate",
									children: upiId
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: copyUpiId,
									className: "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-xs font-semibold text-gold hover:bg-gold/20 transition-colors",
									children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }), " Copied"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" }), " Copy ID"] })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-[11px] text-muted-foreground",
								children: ["Payee: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground/80",
									children: merchantName
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center sm:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: upiUrl,
							className: "inline-flex items-center justify-center gap-2 w-full rounded-full border border-gold px-6 py-3 text-sm font-semibold text-gold hover:bg-gold/10 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "h-4 w-4" }), " Pay with UPI App (Mobile Only)"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hairline-gold" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-foreground/90 max-w-md mx-auto",
								children: "After completing your payment, click the button below. Your order details will be automatically sent to Gold Taste on WhatsApp."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleConfirmOnWhatsApp,
								disabled: submitting,
								className: "inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gold px-9 py-4 text-base font-semibold text-primary-foreground shadow-gold hover:opacity-90 transition-opacity disabled:opacity-50",
								children: submitting ? "Placing Order..." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Payment Completed — Confirm on WhatsApp" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-4 w-4" })] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Our kitchen manually verifies each payment before preparing and dispatching your halwa."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pt-2 flex justify-start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/checkout",
							className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), " Back to Delivery Details"]
						})
					})
				]
			})]
		})
	})] });
}
//#endregion
export { PaymentPage as component };
