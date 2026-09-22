import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as SiteLayout, t as PageHeader } from "./SiteLayout-Diear1rn.mjs";
import { g as useProducts } from "./shop-Bp4shyxJ.mjs";
import { t as ProductCard } from "./ProductCard-D5PIchRw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products.index-B-MJeMn0.js
var import_jsx_runtime = require_jsx_runtime();
function Products() {
	const { data, isLoading, isError } = useProducts();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Our Halwa",
		title: "Freshly Prepared Halwa",
		subtitle: "Choose your halwa and weight. Every box is cooked after you order and packed with care."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 py-12",
		children: [
			isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: [
					0,
					1,
					2,
					3,
					4,
					5
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "luxe-card h-80 animate-pulse" }, i))
			}),
			isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-sm text-destructive",
				children: "We couldn't load the menu just now. Please check your connection and try again."
			}),
			!isLoading && !isError && (data ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-sm text-muted-foreground",
				children: "No halwa is listed yet. Please check back shortly."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: (data ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
			})
		]
	})] });
}
//#endregion
export { Products as component };
