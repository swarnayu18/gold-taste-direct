import { r as __toESM } from "../_runtime.mjs";
import { a as defaultGallery } from "./brand-DAhpdDak.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as X, t as ZoomIn } from "../_libs/lucide-react.mjs";
import { n as SiteLayout, t as PageHeader } from "./SiteLayout-Diear1rn.mjs";
import { m as useGallery } from "./shop-Bp4shyxJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery-CrdYveG7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GalleryPage() {
	const { data: dbGallery, isLoading } = useGallery();
	const [activeImage, setActiveImage] = (0, import_react.useState)(null);
	const images = dbGallery && dbGallery.length > 0 ? dbGallery : defaultGallery.map((g, idx) => ({
		id: `default-${idx}`,
		...g
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Visual Journey",
		title: "From Our Kitchen",
		subtitle: "A look into our slow-cooked halwa, pure ingredients, and handcrafted boxes."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 py-12",
		children: [
			isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4",
				children: [
					0,
					1,
					2,
					3,
					4,
					5,
					6,
					7
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "luxe-card aspect-square animate-pulse" }, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 md:gap-6",
				children: images.map((img) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onClick: () => setActiveImage(img),
					className: "group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-charcoal transition-all hover:border-gold/60 hover:shadow-gold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: img.image_url,
						alt: img.caption || "Gold Taste Halwa",
						loading: "lazy",
						className: "aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-medium text-gold flex items-center gap-1.5 mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "h-3.5 w-3.5" }), " View Photo"]
						}), img.caption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-foreground/90 font-medium line-clamp-2",
							children: img.caption
						})]
					})]
				}, img.id))
			}),
			activeImage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md p-4",
				onClick: () => setActiveImage(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative max-w-3xl w-full rounded-3xl border border-gold/40 bg-card p-3 shadow-luxe overflow-hidden",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setActiveImage(null),
							className: "absolute top-5 right-5 z-10 rounded-full bg-background/80 p-2 text-foreground hover:text-gold border border-border",
							"aria-label": "Close image preview",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: activeImage.image_url,
							alt: activeImage.caption || "Gold Taste halwa",
							className: "max-h-[75vh] w-full rounded-2xl object-contain bg-black/40"
						}),
						activeImage.caption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-4 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-foreground",
								children: activeImage.caption
							})
						})
					]
				})
			})
		]
	})] });
}
//#endregion
export { GalleryPage as component };
