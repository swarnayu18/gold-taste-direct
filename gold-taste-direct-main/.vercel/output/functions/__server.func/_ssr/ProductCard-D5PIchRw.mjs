import { o as formatINR, p as productImage } from "./brand-DAhpdDak.mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-D5PIchRw.js
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ product }) {
	const variants = product.product_variants.filter((v) => v.is_active);
	const from = variants.length ? Math.min(...variants.map((v) => v.price)) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/products/$slug",
		params: { slug: product.slug },
		className: "group luxe-card overflow-hidden transition-transform duration-300 hover:-translate-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-4/3 overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: productImage(product.slug, product.image_url),
					alt: product.name,
					loading: "lazy",
					decoding: "async",
					className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
				}),
				!product.in_stock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs text-muted-foreground",
					children: "Currently unavailable"
				}),
				product.is_featured && product.in_stock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-medium text-primary-foreground",
					children: "Featured"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xl text-foreground",
					children: product.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 line-clamp-2 text-sm text-muted-foreground",
					children: product.short_description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-gold",
						children: variants.length ? `From ${formatINR(from)}` : "Price on request"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs tracking-widest text-muted-foreground uppercase group-hover:text-gold",
						children: "View"
					})]
				}),
				product.price_is_placeholder && variants.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[11px] text-muted-foreground",
					children: "Placeholder price — editable in admin"
				})
			]
		})]
	});
}
//#endregion
export { ProductCard as t };
