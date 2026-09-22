import { c as ingredientsImage, f as packagingImage, s as heroImage } from "./brand-DAhpdDak.mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Truck, k as Leaf, s as Sparkles, x as PackageCheck } from "../_libs/lucide-react.mjs";
import { n as SiteLayout, r as WhatsAppHelpLink, t as PageHeader } from "./SiteLayout-Diear1rn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-D-3UwmE_.js
var import_jsx_runtime = require_jsx_runtime();
var PILLARS = [
	{
		num: "01",
		icon: Sparkles,
		title: "Freshly Prepared",
		text: "We cook our halwa in small home-kitchen batches only after orders are received, ensuring maximum aroma and tenderness in every bite."
	},
	{
		num: "02",
		icon: Leaf,
		title: "Traditional Taste",
		text: "Every recipe honors classic Indian sweet-making: pure cow ghee, grated carrots, slow-roasted semolina or moong dal, and crushed green cardamom."
	},
	{
		num: "03",
		icon: PackageCheck,
		title: "Carefully Packed",
		text: "Our boxes are sealed to lock in warmth, freshness and purity, packaged so gracefully that they feel like a thoughtful gift."
	},
	{
		num: "04",
		icon: Truck,
		title: "Local Delivery",
		text: "Convenient local doorstep delivery throughout Malda Town (1–2 days) and nearby localities (2–3 days)."
	}
];
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Our Story",
			title: "Made With Tradition. Presented With Care.",
			subtitle: "The story of a passionate home kitchen dedicated to bringing genuine, slow-cooked halwa to Malda."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 py-12 md:py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-12 lg:grid-cols-2 items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Home-Cooked Warmth"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl md:text-4xl font-serif leading-tight",
							children: "A Taste Worth Remembering"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground leading-relaxed",
							children: "Gold Taste is a home-based premium halwa brand serving Malda and nearby customers with traditionally inspired sweet flavours and carefully prepared products."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground leading-relaxed",
							children: "We started with a simple belief: real Indian halwa should never come from mass-produced factory shelves. It deserves slow roasting, patient stirring over gentle heat, and the unmistakable aroma of golden ghee and whole spices that fills a home during festive gatherings."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-2 flex flex-wrap items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/products",
								className: "rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity",
								children: "Explore Our Halwa"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppHelpLink, {})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pattern-ornament absolute -inset-4 rounded-3xl opacity-50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: heroImage,
						alt: "Freshly prepared halwa",
						className: "luxe-card relative aspect-4/3 w-full object-cover shadow-luxe"
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border bg-charcoal",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-16 md:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center max-w-2xl mx-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "The Four Pillars"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-3xl md:text-4xl font-serif",
							children: "Why Gold Taste is Special"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: "We focus on doing a few things with complete honesty, patience and pride."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
					children: PILLARS.map((p) => {
						const Icon = p.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "luxe-card p-6 flex flex-col justify-between",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-serif text-2xl text-gold/40",
									children: p.num
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-7 w-7 text-gold mt-3" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 text-xl font-serif",
									children: p.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed",
									children: p.text
								})
							] })
						}, p.num);
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 md:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-12 lg:grid-cols-2 items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "order-2 lg:order-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: ingredientsImage,
						alt: "Halwa ingredients",
						className: "luxe-card aspect-4/3 w-full object-cover shadow-luxe"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "order-1 lg:order-2 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Our Kitchen Standard"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl md:text-4xl font-serif leading-tight",
							children: "Only Pure, Honest Ingredients"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground leading-relaxed",
							children: "In our kitchen, quality starts with what goes into the kadai. We use pure ghee, fresh milk, premium semolina, roasted lentils, juicy carrots, and an abundance of cashews, almonds and raisins."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground leading-relaxed",
							children: "We never use artificial food coloring, unnecessary chemical preservatives, or synthetic flavor enhancers. When you open a Gold Taste box, you taste genuine homemade halwa prepared with honest affection."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-6 pt-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-2xl font-serif text-gold",
									children: "100%"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Vegetarian Sweets"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-px bg-border" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-2xl font-serif text-gold",
									children: "Fresh"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Made on Order"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-px bg-border" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-2xl font-serif text-gold",
									children: "Malda"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Local Home Kitchen"
								})] })
							]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-border bg-charcoal",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-6xl px-4 py-16 md:py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-10 lg:grid-cols-2 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "Presentation & Gifting"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-3xl md:text-4xl font-serif",
								children: "A Box That Feels Like a Celebration"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground leading-relaxed",
								children: "Whether you are treating your family after dinner or sending sweets to friends and relatives across Malda, our packaging reflects the love inside. Sealed tightly for freshness and presented in luxury black and gold gift-ready boxes."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/delivery",
								className: "inline-flex rounded-full border border-gold px-6 py-3 text-sm font-semibold text-gold hover:bg-gold/10 transition-colors",
								children: "Learn About Delivery & Packing"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: packagingImage,
						alt: "Gold Taste packaging",
						className: "luxe-card aspect-4/3 w-full object-cover shadow-luxe"
					}) })]
				})
			})
		})
	] });
}
//#endregion
export { AboutPage as component };
