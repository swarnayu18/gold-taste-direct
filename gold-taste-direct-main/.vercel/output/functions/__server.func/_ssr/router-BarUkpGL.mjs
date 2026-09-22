import { r as __toESM } from "../_runtime.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { a as require_jsx_runtime, o as require_react, r as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BarUkpGL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DSetRLm7.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var STORAGE_KEY = "goldtaste.cart.v1";
var CartContext = (0, import_react.createContext)(null);
function CartProvider({ children }) {
	const [lines, setLines] = (0, import_react.useState)([]);
	const [drawerOpen, setDrawerOpen] = (0, import_react.useState)(false);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = window.localStorage.getItem(STORAGE_KEY);
			if (raw) setLines(JSON.parse(raw));
		} catch {}
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		try {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
		} catch {}
	}, [lines, hydrated]);
	const addLine = (0, import_react.useCallback)((line) => {
		setLines((current) => {
			const index = current.findIndex((l) => l.slug === line.slug && l.weightLabel === line.weightLabel);
			if (index === -1) return [...current, line];
			const next = [...current];
			next[index] = {
				...next[index],
				quantity: next[index].quantity + line.quantity
			};
			return next;
		});
	}, []);
	const setQuantity = (0, import_react.useCallback)((slug, weightLabel, quantity) => {
		setLines((current) => current.map((l) => l.slug === slug && l.weightLabel === weightLabel ? {
			...l,
			quantity: Math.max(0, quantity)
		} : l).filter((l) => l.quantity > 0));
	}, []);
	const removeLine = (0, import_react.useCallback)((slug, weightLabel) => {
		setLines((current) => current.filter((l) => !(l.slug === slug && l.weightLabel === weightLabel)));
	}, []);
	const clear = (0, import_react.useCallback)(() => setLines([]), []);
	const value = (0, import_react.useMemo)(() => {
		const count = lines.reduce((sum, l) => sum + l.quantity, 0);
		const subtotal = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
		return {
			lines,
			count,
			subtotal,
			addLine,
			setQuantity,
			removeLine,
			clear,
			drawerOpen,
			setDrawerOpen
		};
	}, [
		lines,
		addLine,
		setQuantity,
		removeLine,
		clear,
		drawerOpen
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value,
		children
	});
}
function useCart() {
	const ctx = (0, import_react.useContext)(CartContext);
	if (!ctx) throw new Error("useCart must be used inside CartProvider");
	return ctx;
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$16 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Gold Taste | Premium Halwa in Malda" },
			{
				name: "description",
				content: "Gold Taste offers premium homemade halwa in Malda with convenient local delivery. Order fresh traditional halwa and sweets online."
			},
			{
				name: "author",
				content: "Gold Taste"
			},
			{
				property: "og:title",
				content: "Gold Taste | Premium Halwa in Malda"
			},
			{
				property: "og:description",
				content: "Gold Taste offers premium homemade halwa in Malda with convenient local delivery. Order fresh traditional halwa and sweets online."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@300;400;500;600&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$16.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CartProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})] })
	});
}
var $$splitComponentImporter$15 = () => import("./routes-B_S7YdjL.mjs");
var Route$15 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Gold Taste | Premium Halwa in Malda" },
		{
			name: "description",
			content: "Gold Taste offers premium homemade halwa in Malda with convenient local delivery. Order fresh traditional halwa and sweets online."
		},
		{
			property: "og:title",
			content: "Gold Taste | Premium Halwa in Malda"
		},
		{
			property: "og:description",
			content: "Gold Taste offers premium homemade halwa in Malda with convenient local delivery. Order fresh traditional halwa and sweets online."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./about-D-3UwmE_.mjs");
var Route$14 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About Us | Gold Taste Malda" },
		{
			name: "description",
			content: "Learn about Gold Taste — homemade premium halwa in Malda, West Bengal, slow-cooked in small batches with traditional ingredients."
		},
		{
			property: "og:title",
			content: "About Us | Gold Taste Malda"
		},
		{
			property: "og:description",
			content: "Traditional recipes, rich flavours and freshly prepared halwa in Malda."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./cart-BXAyFqTu.mjs");
var Route$13 = createFileRoute("/cart")({
	head: () => ({ meta: [
		{ title: "Your Cart | Gold Taste" },
		{
			name: "description",
			content: "Review your Gold Taste halwa order before checkout."
		},
		{
			property: "og:title",
			content: "Your Cart | Gold Taste"
		},
		{
			property: "og:description",
			content: "Review your Gold Taste halwa order before checkout."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./checkout-7N0Lzlnq.mjs");
var Route$12 = createFileRoute("/checkout")({
	head: () => ({ meta: [
		{ title: "Checkout | Gold Taste Malda" },
		{
			name: "description",
			content: "Enter your delivery details and review your Gold Taste halwa order."
		},
		{
			property: "og:title",
			content: "Checkout | Gold Taste Malda"
		},
		{
			property: "og:description",
			content: "Enter your delivery details and review your Gold Taste halwa order."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./contact-DHaBiKza.mjs");
var Route$11 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact Us | Gold Taste Malda" },
		{
			name: "description",
			content: "Get in touch with Gold Taste halwa kitchen in Malda. Call, WhatsApp or email us for orders and inquiries."
		},
		{
			property: "og:title",
			content: "Contact Us | Gold Taste Malda"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./delivery-DggUo2fZ.mjs");
var Route$10 = createFileRoute("/delivery")({
	head: () => ({ meta: [
		{ title: "Delivery Information | Gold Taste Malda" },
		{
			name: "description",
			content: "Find out how Gold Taste delivers fresh halwa across Malda Town (1–2 days) and nearby areas (2–3 days)."
		},
		{
			property: "og:title",
			content: "Delivery Information | Gold Taste Malda"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./gallery-CrdYveG7.mjs");
var Route$9 = createFileRoute("/gallery")({
	head: () => ({ meta: [
		{ title: "Gallery | Gold Taste Malda" },
		{
			name: "description",
			content: "Explore photographs of Gold Taste halwa, our traditional preparation, fresh ingredients and premium packaging in Malda."
		},
		{
			property: "og:title",
			content: "Gallery | Gold Taste Malda"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./order-confirmation-KD44gRDU.mjs");
var Route$8 = createFileRoute("/order-confirmation")({
	validateSearch: (search) => ({ code: typeof search.code === "string" ? search.code : void 0 }),
	head: () => ({ meta: [
		{ title: "Order Confirmed | Gold Taste Malda" },
		{
			name: "description",
			content: "Your Gold Taste halwa order has been submitted successfully."
		},
		{
			property: "og:title",
			content: "Order Confirmed | Gold Taste Malda"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./payment-B0zNIC_k.mjs");
var Route$7 = createFileRoute("/payment")({
	head: () => ({ meta: [
		{ title: "UPI Payment | Gold Taste Malda" },
		{
			name: "description",
			content: "Scan and pay using any UPI app to complete your Gold Taste halwa order."
		},
		{
			property: "og:title",
			content: "UPI Payment | Gold Taste Malda"
		},
		{
			property: "og:description",
			content: "Scan and pay using any UPI app to complete your Gold Taste halwa order."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./privacy-BR5cFDbz.mjs");
var Route$6 = createFileRoute("/privacy")({
	head: () => ({ meta: [
		{ title: "Privacy Policy | Gold Taste Malda" },
		{
			name: "description",
			content: "Privacy Policy for Gold Taste homemade halwa and sweets in Malda."
		},
		{
			property: "og:title",
			content: "Privacy Policy | Gold Taste Malda"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./terms-C0gTCX2R.mjs");
var Route$5 = createFileRoute("/terms")({
	head: () => ({ meta: [
		{ title: "Terms & Conditions | Gold Taste Malda" },
		{
			name: "description",
			content: "Terms and conditions for ordering homemade halwa from Gold Taste in Malda."
		},
		{
			property: "og:title",
			content: "Terms & Conditions | Gold Taste Malda"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./track-BrZOk7Xs.mjs");
var Route$4 = createFileRoute("/track")({
	validateSearch: (search) => ({
		order: typeof search.order === "string" ? search.order : void 0,
		mobile: typeof search.mobile === "string" ? search.mobile : void 0
	}),
	head: () => ({ meta: [
		{ title: "Track Order | Gold Taste Malda" },
		{
			name: "description",
			content: "Track your fresh halwa preparation and delivery status in Malda."
		},
		{
			property: "og:title",
			content: "Track Order | Gold Taste Malda"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./admin.index-CjKLZWQG.mjs");
var Route$3 = createFileRoute("/admin/")({
	head: () => ({ meta: [{ title: "Admin Dashboard | Gold Taste Malda" }, {
		name: "robots",
		content: "noindex, nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./admin.login-Djg9472g.mjs");
var Route$2 = createFileRoute("/admin/login")({
	head: () => ({ meta: [{ title: "Admin Login | Gold Taste Malda" }, {
		name: "robots",
		content: "noindex, nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./products.index-B-MJeMn0.mjs");
var Route$1 = createFileRoute("/products/")({
	head: () => ({ meta: [
		{ title: "Our Halwa | Gold Taste Malda" },
		{
			name: "description",
			content: "Browse Gold Taste halwa — gajar, suji, moong dal, besan, dry fruit and our special halwa, available in 250g, 500g and 1kg boxes."
		},
		{
			property: "og:title",
			content: "Our Halwa | Gold Taste Malda"
		},
		{
			property: "og:description",
			content: "Freshly prepared premium halwa from Malda, available in 250g, 500g and 1kg boxes."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./products._slug-B8lXeiyg.mjs");
var Route = createFileRoute("/products/$slug")({
	head: ({ params }) => {
		const title = params.slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
		return { meta: [
			{ title: `${title} | Gold Taste Malda` },
			{
				name: "description",
				content: `Order ${title} from Gold Taste — freshly prepared premium halwa in Malda with local delivery.`
			},
			{
				property: "og:title",
				content: `${title} | Gold Taste Malda`
			},
			{
				property: "og:description",
				content: `Order ${title} from Gold Taste — freshly prepared premium halwa in Malda.`
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$15.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$16
});
var AboutRoute = Route$14.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$16
});
var CartRoute = Route$13.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$16
});
var CheckoutRoute = Route$12.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$16
});
var ContactRoute = Route$11.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$16
});
var DeliveryRoute = Route$10.update({
	id: "/delivery",
	path: "/delivery",
	getParentRoute: () => Route$16
});
var GalleryRoute = Route$9.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => Route$16
});
var OrderConfirmationRoute = Route$8.update({
	id: "/order-confirmation",
	path: "/order-confirmation",
	getParentRoute: () => Route$16
});
var PaymentRoute = Route$7.update({
	id: "/payment",
	path: "/payment",
	getParentRoute: () => Route$16
});
var PrivacyRoute = Route$6.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$16
});
var TermsRoute = Route$5.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$16
});
var TrackRoute = Route$4.update({
	id: "/track",
	path: "/track",
	getParentRoute: () => Route$16
});
var AdminIndexRoute = Route$3.update({
	id: "/admin/",
	path: "/admin/",
	getParentRoute: () => Route$16
});
var AdminLoginRoute = Route$2.update({
	id: "/admin/login",
	path: "/admin/login",
	getParentRoute: () => Route$16
});
var ProductsIndexRoute = Route$1.update({
	id: "/products/",
	path: "/products/",
	getParentRoute: () => Route$16
});
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	CartRoute,
	CheckoutRoute,
	ContactRoute,
	DeliveryRoute,
	GalleryRoute,
	OrderConfirmationRoute,
	PaymentRoute,
	PrivacyRoute,
	TermsRoute,
	TrackRoute,
	AdminLoginRoute,
	ProductsSlugRoute: Route.update({
		id: "/products/$slug",
		path: "/products/$slug",
		getParentRoute: () => Route$16
	}),
	AdminIndexRoute,
	ProductsIndexRoute
};
var routeTree = Route$16._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { Route as n, useCart as r, router_exports as t };
