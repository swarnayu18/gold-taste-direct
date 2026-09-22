import { r as __toESM } from "../_runtime.mjs";
import { o as formatINR, p as productImage } from "./brand-DAhpdDak.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Route, r as useCart } from "./router-BarUkpGL.mjs";
import { S as Minus, i as Truck, s as Sparkles, v as Plus, x as PackageCheck } from "../_libs/lucide-react.mjs";
import { n as SiteLayout } from "./SiteLayout-Diear1rn.mjs";
import { h as useProduct } from "./shop-Bp4shyxJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products._slug-B8lXeiyg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductDetail() {
	const { slug } = Route.useParams();
	const navigate = useNavigate();
	const { data: product, isLoading, isError } = useProduct(slug);
	const { addLine } = useCart();
	const [variantId, setVariantId] = (0, import_react.useState)(null);
	const [quantity, setQuantity] = (0, import_react.useState)(1);
	const variants = (0, import_react.useMemo)(() => (product?.product_variants ?? []).filter((v) => v.is_active), [product]);
	const selected = variants.find((v) => v.id === variantId) ?? variants[0];
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-6xl px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "luxe-card h-96 animate-pulse" })
	}) });
	if (isError || !product || !product.is_active) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl",
				children: "This halwa isn't available"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "The item you opened is not on our list right now."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/products",
				className: "mt-6 inline-flex rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground",
				children: "Browse all halwa"
			})
		]
	}) });
	const addToCart = () => {
		if (!product.in_stock) {
			toast.error("This halwa is currently unavailable.");
			return;
		}
		if (!selected) {
			toast.error("Please choose a weight first.");
			return;
		}
		const line = {
			productId: product.id,
			slug: product.slug,
			name: product.name,
			weightLabel: selected.weight_label,
			price: Number(selected.price),
			quantity,
			imageUrl: product.image_url
		};
		addLine(line);
		toast.success(`${product.name} (${selected.weight_label}) added to cart`);
		return true;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-2 md:py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: productImage(product.slug, product.image_url),
			alt: product.name,
			className: "luxe-card aspect-square w-full object-cover"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/products",
				className: "text-xs tracking-widest text-gold uppercase",
				children: "← Our Halwa"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 text-4xl",
				children: product.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted-foreground",
				children: product.description || product.short_description
			}),
			product.ingredients && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm text-foreground/80",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-gold",
					children: "Ingredients: "
				}), product.ingredients]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Select weight"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-3",
						children: [variants.map((v) => {
							const active = selected?.id === v.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setVariantId(v.id),
								className: `min-w-28 rounded-2xl border px-5 py-3 text-left transition-colors ${active ? "border-gold bg-gold/10" : "border-border hover:border-gold/60"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm",
									children: v.weight_label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm text-gold",
									children: formatINR(Number(v.price))
								})]
							}, v.id);
						}), variants.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Weights and prices are not configured yet."
						})]
					}),
					product.price_is_placeholder && variants.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "Placeholder price — the owner can update it in the admin panel."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7 flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Quantity"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 rounded-full border border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Decrease quantity",
							onClick: () => setQuantity((q) => Math.max(1, q - 1)),
							className: "inline-flex h-11 w-11 items-center justify-center rounded-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-8 text-center",
							children: quantity
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Increase quantity",
							onClick: () => setQuantity((q) => Math.min(50, q + 1)),
							className: "inline-flex h-11 w-11 items-center justify-center rounded-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
						})
					]
				})]
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-2xl text-gold",
				children: formatINR(Number(selected.price) * quantity)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: addToCart,
					disabled: !product.in_stock,
					className: "rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-50",
					children: "Add to Cart"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						if (addToCart()) navigate({ to: "/checkout" });
					},
					disabled: !product.in_stock,
					className: "rounded-full border border-gold px-7 py-3.5 text-sm font-semibold text-gold disabled:opacity-50",
					children: "Buy Now"
				})]
			}),
			!product.in_stock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-destructive",
				children: "Currently unavailable. Please check back or message us on WhatsApp."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-8 grid gap-3 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-gold" }), " Freshly prepared"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageCheck, { className: "h-4 w-4 text-gold" }), " Carefully packed"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-4 w-4 text-gold" }), " Delivery available in Malda"]
					})
				]
			})
		] })]
	}) });
}
//#endregion
export { ProductDetail as component };
