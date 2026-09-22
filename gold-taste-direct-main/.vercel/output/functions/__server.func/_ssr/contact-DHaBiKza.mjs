import { r as __toESM } from "../_runtime.mjs";
import { m as whatsappLink, n as HELP_MESSAGE, t as BRAND } from "./brand-DAhpdDak.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as MessageCircle, E as Mail, T as MapPin, p as Send, s as Sparkles, y as Phone } from "../_libs/lucide-react.mjs";
import { n as SiteLayout, t as PageHeader } from "./SiteLayout-Diear1rn.mjs";
import { v as useSettings } from "./shop-Bp4shyxJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-DHaBiKza.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	const { data: settings } = useSettings();
	const contact = settings?.contact ?? {
		phone: BRAND.phone,
		whatsapp: BRAND.whatsapp,
		email: BRAND.email,
		address: BRAND.address,
		maps_embed_url: ""
	};
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		phone: "",
		topic: "general",
		message: ""
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
			toast.error("Please fill in your name, phone number, and message.");
			return;
		}
		const text = [
			`Hello Gold Taste 👋`,
			`I am reaching out through your website.`,
			``,
			`Name: ${form.name}`,
			`Phone: ${form.phone}`,
			`Inquiry: ${{
				general: "General Inquiry",
				bulk: "Party / Bulk Order",
				custom: "Special Halwa Request"
			}[form.topic] || form.topic}`,
			`Message: ${form.message}`
		].join("\n");
		const url = whatsappLink(text, contact.whatsapp);
		window.open(url, "_blank", "noopener,noreferrer");
		toast.success("Opening WhatsApp to send your inquiry");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Get In Touch",
		title: "We Would Love to Hear From You",
		subtitle: "Have a question about our halwa, party orders, or delivery timing? Reach out to our kitchen."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-6xl px-4 py-12 md:py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-10 lg:grid-cols-[1fr_1.3fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "luxe-card p-6 md:p-8 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-serif",
							children: "Kitchen Contact"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground leading-relaxed",
							children: "We are a local home-based halwa kitchen based in Malda, West Bengal. You can call or message us directly for immediate help with your order."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5 pt-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs uppercase tracking-wider text-muted-foreground",
										children: "Kitchen Address"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-foreground mt-0.5",
										children: contact.address
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-5 w-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs uppercase tracking-wider text-muted-foreground",
										children: "Direct Call"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: `tel:${contact.phone}`,
										className: "text-sm font-medium text-foreground hover:text-gold transition-colors mt-0.5 block",
										children: ["+91 ", contact.phone]
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-5 w-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs uppercase tracking-wider text-muted-foreground",
										children: "WhatsApp Assistance"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: whatsappLink(HELP_MESSAGE, contact.whatsapp),
										target: "_blank",
										rel: "noreferrer",
										className: "text-sm font-medium text-foreground hover:text-gold transition-colors mt-0.5 block",
										children: [
											"+91 ",
											contact.whatsapp,
											" (Instant Chat)"
										]
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs uppercase tracking-wider text-muted-foreground",
										children: "Email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `mailto:${contact.email}`,
										className: "text-sm font-medium text-foreground hover:text-gold transition-colors mt-0.5 block",
										children: contact.email
									})] })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-4 border-t border-border flex flex-wrap gap-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `tel:${contact.phone}`,
									className: "rounded-full bg-gold px-5 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90",
									children: "Call Now"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: whatsappLink(HELP_MESSAGE, contact.whatsapp),
									target: "_blank",
									rel: "noreferrer",
									className: "rounded-full border border-gold px-5 py-2 text-xs font-semibold text-gold hover:bg-gold/10",
									children: "WhatsApp"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `mailto:${contact.email}`,
									className: "rounded-full border border-border px-5 py-2 text-xs font-medium text-muted-foreground hover:text-foreground",
									children: "Email Us"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "luxe-card p-6 overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-sm font-semibold mb-2 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-gold" }), " Malda, West Bengal"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mb-4",
							children: "Ar Ki Mirchok Road, Malda, West Bengal, India"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-video w-full rounded-xl border border-border bg-charcoal flex items-center justify-center text-center p-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-6 w-6 text-gold mx-auto mb-2 opacity-70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Home Kitchen location in Malda Town. Doorstep delivery available across town."
							})] })
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "luxe-card p-6 md:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-serif",
						children: "Send an Inquiry"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Planning a celebration, festival or family dinner? Send us your message and we will connect on WhatsApp."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "mt-6 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-xs uppercase tracking-wider text-foreground/80 font-medium",
								children: ["Your Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								placeholder: "e.g. Sourav Mukherjee",
								value: form.name,
								onChange: (e) => setForm({
									...form,
									name: e.target.value
								}),
								className: "mt-1.5 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-xs uppercase tracking-wider text-foreground/80 font-medium",
								children: ["Phone / WhatsApp Number ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "tel",
								required: true,
								placeholder: "10-digit mobile number",
								value: form.phone,
								onChange: (e) => setForm({
									...form,
									phone: e.target.value
								}),
								className: "mt-1.5 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs uppercase tracking-wider text-foreground/80 font-medium",
								children: "Inquiry Type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: form.topic,
								onChange: (e) => setForm({
									...form,
									topic: e.target.value
								}),
								className: "mt-1.5 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "general",
										children: "General Inquiry / Question"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "bulk",
										children: "Party / Bulk Order (5kg+)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "custom",
										children: "Special Halwa Request"
									})
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-xs uppercase tracking-wider text-foreground/80 font-medium",
								children: ["Message ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								required: true,
								rows: 4,
								placeholder: "Tell us what you'd like to order or ask...",
								value: form.message,
								onChange: (e) => setForm({
									...form,
									message: e.target.value
								}),
								className: "mt-1.5 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									className: "inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" }), " Send via WhatsApp"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-center text-[11px] text-muted-foreground",
									children: "Clicking will open WhatsApp with your message ready to send."
								})]
							})
						]
					})
				]
			})]
		})
	})] });
}
//#endregion
export { ContactPage as component };
