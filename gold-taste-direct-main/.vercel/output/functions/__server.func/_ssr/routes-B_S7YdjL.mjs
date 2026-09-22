import { f as packagingImage, s as heroImage, t as BRAND } from "./brand-DAhpdDak.mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Truck, k as Leaf, s as Sparkles, x as PackageCheck } from "../_libs/lucide-react.mjs";
import { n as SiteLayout, r as WhatsAppHelpLink } from "./SiteLayout-Diear1rn.mjs";
import { g as useProducts, m as useGallery, v as useSettings, y as useTestimonials } from "./shop-Bp4shyxJ.mjs";
import { t as ProductCard } from "./ProductCard-D5PIchRw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B_S7YdjL.js
var import_jsx_runtime = require_jsx_runtime();
var WHY = [
	{
		icon: Sparkles,
		title: "Freshly Prepared",
		text: "Every batch is cooked in small quantities after your order."
	},
	{
		icon: Leaf,
		title: "Traditional Taste",
		text: "Slow-cooked the homely way, rich in flavour and aroma."
	},
	{
		icon: PackageCheck,
		title: "Carefully Packed",
		text: "Sealed and boxed neatly so it travels and gifts well."
	},
	{
		icon: Truck,
		title: "Local Delivery",
		text: "Delivered across Malda Town and nearby areas."
	}
];
function Home() {
	const { data: products } = useProducts();
	const { data: gallery } = useGallery();
	const { data: testimonials } = useTestimonials();
	const { data: settings } = useSettings();
	const featured = (products ?? []).filter((p) => p.is_featured).slice(0, 3);
	const showcase = featured.length ? featured : (products ?? []).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
			type: "application/ld+json",
			dangerouslySetInnerHTML: { __html: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "FoodEstablishment",
				name: BRAND.name,
				description: "Premium homemade halwa in Malda, West Bengal with local delivery.",
				telephone: BRAND.phone,
				email: BRAND.email,
				address: {
					"@type": "PostalAddress",
					streetAddress: "Ar Ki Mirchok Road",
					addressLocality: "Malda",
					addressRegion: "West Bengal",
					addressCountry: "IN"
				},
				servesCuisine: "Indian sweets"
			}) }
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "relative overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "reveal-up",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: BRAND.secondaryTagline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-4 text-5xl leading-[1.05] md:text-6xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gold-gradient",
									children: "Gold Taste"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Premium Halwa"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-md text-muted-foreground",
							children: "Home-made halwa from Malda, West Bengal — slow-cooked in small batches, packed with care, and delivered to your door."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/products",
								className: "rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90",
								children: "Order Now"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppHelpLink, {})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pattern-ornament absolute -inset-4 rounded-4xl opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: heroImage,
						alt: "Freshly prepared Gold Taste halwa",
						className: "luxe-card relative aspect-4/3 w-full object-cover"
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border bg-charcoal",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-14 md:py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow text-center",
						children: "Why Gold Taste"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-center text-3xl md:text-4xl",
						children: "Small batch. Big on flavour."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
						children: WHY.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "luxe-card p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(w.icon, { className: "h-7 w-7 text-gold" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 text-xl",
									children: w.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: w.text
								})
							]
						}, w.title))
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-14 md:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Our Halwa"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-3xl md:text-4xl",
					children: "Handpicked favourites"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/products",
					className: "text-sm text-gold hover:underline",
					children: "View all"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: showcase.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: packagingImage,
					alt: "Gold Taste halwa packed for delivery",
					loading: "lazy",
					className: "luxe-card aspect-4/3 w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "About Us"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-3xl md:text-4xl",
						children: "Made With Tradition. Presented With Care."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted-foreground",
						children: "Gold Taste is a small home-based halwa kitchen in Malda. We cook the way families always have — patiently, in small quantities, using simple ingredients — and present every box so it feels like a gift."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/about",
						className: "mt-6 inline-flex rounded-full border border-gold px-6 py-3 text-sm font-medium text-gold",
						children: "Read our story"
					})
				] })]
			})
		}),
		(gallery ?? []).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-14 md:py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Gallery"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-3xl md:text-4xl",
					children: "From our kitchen"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid grid-cols-2 gap-4 md:grid-cols-4",
					children: (gallery ?? []).slice(0, 4).map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: g.image_url,
						alt: g.caption ?? "Gold Taste halwa",
						loading: "lazy",
						className: "aspect-square w-full rounded-2xl border border-border object-cover"
					}, g.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/gallery",
					className: "mt-6 inline-block text-sm text-gold hover:underline",
					children: "See full gallery"
				})
			]
		}),
		(testimonials ?? []).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border bg-charcoal",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-14 md:py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Testimonials"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-3xl md:text-4xl",
						children: "Placeholder reviews"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "These are editable placeholders — replace them with real customer words from the admin panel."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-5 md:grid-cols-3",
						children: (testimonials ?? []).slice(0, 3).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
							className: "luxe-card p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
								className: "text-sm text-foreground/85",
								children: [
									"“",
									t.message,
									"”"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
								className: "mt-4 text-xs tracking-widest text-gold uppercase",
								children: [t.name, t.location ? ` • ${t.location}` : ""]
							})]
						}, t.id))
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 py-14 md:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "luxe-card grid gap-6 p-8 md:grid-cols-2 md:p-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Delivery"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-3xl",
						children: "We deliver in and around Malda"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 space-y-2 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Malda Town — ", settings?.delivery.malda_eta ?? "1–2 days"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Outside Malda Town — ", settings?.delivery.outside_eta ?? "2–3 days"] })]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/products",
						className: "rounded-full bg-gold px-7 py-3.5 text-center text-sm font-semibold text-primary-foreground",
						children: "Start your order"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppHelpLink, {})]
				})]
			})
		})
	] });
}
//#endregion
export { Home as component };
