import { r as __toESM } from "../_runtime.mjs";
import { d as logoImage, m as whatsappLink, n as HELP_MESSAGE, t as BRAND } from "./brand-DAhpdDak.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useCart } from "./router-BarUkpGL.mjs";
import { C as MessageCircle, E as Mail, T as MapPin, l as ShoppingBag, n as X, w as Menu, y as Phone } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteLayout-Diear1rn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/products",
		label: "Our Halwa"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/gallery",
		label: "Gallery"
	},
	{
		to: "/delivery",
		label: "Delivery"
	},
	{
		to: "/track",
		label: "Track Order"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function Navbar() {
	const { count } = useCart();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [pop, setPop] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		if (count === 0) return;
		setPop(true);
		const t = setTimeout(() => setPop(false), 400);
		return () => clearTimeout(t);
	}, [count]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `sticky top-0 z-50 transition-colors duration-300 ${scrolled ? "bg-background/95 backdrop-blur border-b border-border" : "bg-background/70 backdrop-blur-sm"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-3",
					onClick: () => setOpen(false),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: logoImage,
						alt: `${BRAND.name} logo`,
						className: "h-10 w-auto md:h-12"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: BRAND.name
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-7 lg:flex",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: "group relative text-sm tracking-wide text-foreground/80 transition-colors hover:text-gold",
						activeProps: { className: "text-gold" },
						children: [item.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" })]
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/cart",
							"aria-label": "Cart",
							className: "relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:text-gold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-5 w-5" }), count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-semibold text-primary-foreground ${pop ? "cart-pop" : ""}`,
								children: count
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/products",
							className: "hidden rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex",
							children: "Order Now"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Menu",
							onClick: () => setOpen((v) => !v),
							className: "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border lg:hidden",
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
						})
					]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "border-t border-border bg-background px-4 py-3 lg:hidden",
			children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: item.to,
				onClick: () => setOpen(false),
				className: "block border-b border-border/50 py-3 text-base text-foreground/90",
				activeProps: { className: "text-gold" },
				children: item.label
			}, item.to))
		})]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-20 border-t border-border bg-charcoal",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: logoImage,
						alt: `${BRAND.name} logo`,
						className: "h-14 w-auto"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 max-w-xs text-sm text-muted-foreground",
						children: [
							BRAND.tagline,
							". ",
							BRAND.secondaryTagline
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "eyebrow",
						children: "Explore"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2 text-sm",
						children: [
							{
								to: "/products",
								label: "Our Halwa"
							},
							{
								to: "/about",
								label: "About Us"
							},
							{
								to: "/delivery",
								label: "Delivery"
							},
							{
								to: "/track",
								label: "Track Order"
							},
							{
								to: "/privacy",
								label: "Privacy Policy"
							},
							{
								to: "/terms",
								label: "Terms & Conditions"
							},
							{
								to: "/admin/login",
								label: "Admin Portal"
							}
						].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: l.to,
							className: "text-foreground/75 transition-colors hover:text-gold",
							children: l.label
						}) }, l.to))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "eyebrow",
						children: "Contact"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 space-y-3 text-sm text-foreground/75",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0 text-gold" }),
									" ",
									BRAND.address
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 shrink-0 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `tel:${BRAND.phone}`,
									className: "hover:text-gold",
									children: BRAND.phone
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4 shrink-0 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `mailto:${BRAND.email}`,
									className: "hover:text-gold",
									children: BRAND.email
								})]
							})
						]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hairline-gold" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "py-6 text-center text-xs text-muted-foreground",
				children: [
					"© 2026 ",
					BRAND.name,
					". All rights reserved."
				]
			})
		]
	});
}
function WhatsAppHelpLink({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: whatsappLink(HELP_MESSAGE),
		target: "_blank",
		rel: "noreferrer",
		className: `inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:text-gold ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4 text-gold" }), " Need Help? Chat on WhatsApp"]
	});
}
function SiteLayout({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 pb-24 md:pb-0",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-x-0 bottom-0 z-50 flex gap-2 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/products",
					className: "flex-1 rounded-full bg-gold py-3 text-center text-sm font-semibold text-primary-foreground",
					children: "Order Now"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: whatsappLink(HELP_MESSAGE),
					target: "_blank",
					rel: "noreferrer",
					className: "inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-gold py-3 text-sm font-semibold text-gold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), " WhatsApp"]
				})]
			})
		]
	});
}
function PageHeader({ eyebrow, title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pattern-ornament border-b border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-14 text-center md:py-20",
			children: [
				eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: eyebrow
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-4xl text-gold-gradient md:text-5xl",
					children: title
				}),
				subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-4 max-w-2xl text-sm text-muted-foreground md:text-base",
					children: subtitle
				})
			]
		})
	});
}
//#endregion
export { SiteLayout as n, WhatsAppHelpLink as r, PageHeader as t };
