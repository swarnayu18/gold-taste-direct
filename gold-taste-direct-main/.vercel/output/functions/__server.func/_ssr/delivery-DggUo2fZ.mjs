import { o as formatINR } from "./brand-DAhpdDak.mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { R as Clock, T as MapPin, b as Package, i as Truck, s as Sparkles, u as Shield } from "../_libs/lucide-react.mjs";
import { n as SiteLayout, r as WhatsAppHelpLink, t as PageHeader } from "./SiteLayout-Diear1rn.mjs";
import { n as deliveryFeeFor, r as etaFor, v as useSettings } from "./shop-Bp4shyxJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/delivery-DggUo2fZ.js
var import_jsx_runtime = require_jsx_runtime();
function DeliveryPage() {
	const { data: settings } = useSettings();
	const maldaFee = deliveryFeeFor("malda_town", settings?.delivery);
	const outsideFee = deliveryFeeFor("outside_malda", settings?.delivery);
	const maldaEta = etaFor("malda_town", settings?.delivery);
	const outsideEta = etaFor("outside_malda", settings?.delivery);
	const minOrder = Number(settings?.delivery?.minimum_order ?? 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Delivery & Packing",
		title: "Freshness Meets Your Doorstep",
		subtitle: "We deliver our freshly cooked halwa with care throughout Malda and surrounding locations."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 py-12 md:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "luxe-card p-8 relative overflow-hidden flex flex-col justify-between border-gold/30",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-0 right-0 bg-gold/10 text-gold px-4 py-1.5 rounded-bl-2xl text-xs font-semibold uppercase tracking-wider",
							children: "Local Zone"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold mb-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-6 w-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-serif",
								children: "Malda Town"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Freshly prepared and delivered within Malda Town municipal limits and immediate neighbourhoods."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 space-y-3 border-t border-border pt-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Estimated Delivery:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold text-foreground flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-gold" }),
												" ",
												maldaEta
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Delivery Charge:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-gold",
											children: maldaFee === 0 ? "Free Delivery" : formatINR(maldaFee)
										})]
									}),
									minOrder > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Minimum Order:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground",
											children: formatINR(minOrder)
										})]
									})
								]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 pt-6 border-t border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/products",
								className: "block w-full text-center rounded-full bg-gold py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity",
								children: "Order for Malda Town"
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "luxe-card p-8 relative overflow-hidden flex flex-col justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-0 right-0 bg-card border-b border-l border-border text-muted-foreground px-4 py-1.5 rounded-bl-2xl text-xs font-semibold uppercase tracking-wider",
							children: "Extended Zone"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-border/40 text-foreground mb-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-6 w-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-serif",
								children: "Outside Malda Town"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Delivery to surrounding towns, rural blocks and adjacent postal zones in Malda district."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 space-y-3 border-t border-border pt-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Estimated Delivery:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold text-foreground flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-gold" }),
												" ",
												outsideEta
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Delivery Charge:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-gold",
											children: outsideFee === 0 ? "Free Delivery" : formatINR(outsideFee)
										})]
									}),
									minOrder > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Minimum Order:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground",
											children: formatINR(minOrder)
										})]
									})
								]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 pt-6 border-t border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/products",
								className: "block w-full text-center rounded-full border border-gold py-3 text-sm font-semibold text-gold hover:bg-gold/10 transition-colors",
								children: "Order for Outside Malda"
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 rounded-2xl border border-border bg-charcoal p-5 text-xs text-muted-foreground leading-relaxed text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "⚠️ Delivery times are estimated and may vary depending on order volume, location and other local delivery conditions. Since every batch is cooked fresh after you order, we appreciate your patience!" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16 border-t border-border pt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center max-w-2xl mx-auto mb-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Quality & Hygiene"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-3xl font-serif",
							children: "How Your Halwa is Packed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Food safety and packaging integrity are non-negotiable in our home kitchen."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "luxe-card p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-8 w-8 text-gold mb-4" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-serif",
									children: "Food-Grade Sealed Trays"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed",
									children: "Every box is packed in heat-resistant, certified food-safe containers to prevent ghee leakage and keep outside air out."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "luxe-card p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-8 w-8 text-gold mb-4" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-serif",
									children: "Fresh Cooking Guarantee"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed",
									children: "We never dispatch pre-stocked halwa. Your order is slow-cooked after order confirmation so it arrives rich and aromatic."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "luxe-card p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-8 w-8 text-gold mb-4" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-serif",
									children: "Tamper-Proof Box"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed",
									children: "Secured with Gold Taste brand seals so you have complete peace of mind that nobody has opened the box in transit."
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16 border-t border-border pt-16 max-w-3xl mx-auto space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Answers"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-3xl font-serif",
							children: "Frequently Asked Questions"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "luxe-card p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-semibold text-sm",
									children: "How do I store and reheat the halwa?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-muted-foreground leading-relaxed",
									children: "Our halwa can be enjoyed warm or at room temperature. We recommend storing it in a refrigerator once opened. To reheat, microwave for 20–30 seconds or warm gently in a pan with a teaspoon of ghee."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "luxe-card p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-semibold text-sm",
									children: "Can I schedule delivery for a specific date?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-muted-foreground leading-relaxed",
									children: "Yes! When confirming your order on WhatsApp, simply let our team know your preferred delivery date and time for birthdays, pujas, or special family gatherings."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "luxe-card p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-semibold text-sm",
									children: "Do you offer cash on delivery (COD)?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-muted-foreground leading-relaxed",
									children: "Because each batch of halwa is freshly prepared and personalized for you, we currently operate on prepaid UPI orders only. Payment is manually verified before we begin cooking."
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-6 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Have additional delivery questions?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppHelpLink, {})
						})]
					})
				]
			})
		]
	})] });
}
//#endregion
export { DeliveryPage as component };
