import { r as __toESM } from "../_runtime.mjs";
import { i as PAYMENT_STATUS_LABELS, m as whatsappLink, o as formatINR, r as ORDER_STATUS_LABELS, t as BRAND } from "./brand-DAhpdDak.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as CircleAlert, C as MessageCircle, L as CookingPot, R as Clock, b as Package, i as Truck, m as Search, z as CircleCheck } from "../_libs/lucide-react.mjs";
import { n as SiteLayout, t as PageHeader } from "./SiteLayout-Diear1rn.mjs";
import { S as zoneLabel, a as trackOrder } from "./shop-Bp4shyxJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/track-BrZOk7Xs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TIMELINE_STEPS = [
	{
		key: "pending",
		label: "Payment Pending",
		icon: Clock,
		desc: "Awaiting UPI payment"
	},
	{
		key: "payment_verification",
		label: "Payment Verification",
		icon: Clock,
		desc: "Owner matching UPI payment"
	},
	{
		key: "confirmed",
		label: "Confirmed",
		icon: CircleCheck,
		desc: "Payment verified & order accepted"
	},
	{
		key: "preparing",
		label: "Preparing",
		icon: CookingPot,
		desc: "Slow-cooking fresh halwa"
	},
	{
		key: "ready",
		label: "Ready for Dispatch",
		icon: Package,
		desc: "Boxed and sealed with care"
	},
	{
		key: "dispatched",
		label: "Out for Delivery",
		icon: Truck,
		desc: "With local delivery partner"
	},
	{
		key: "delivered",
		label: "Delivered",
		icon: CircleCheck,
		desc: "Delivered to your doorstep"
	}
];
function TrackOrderPage() {
	const search = useSearch({ from: "/track" });
	const [orderCode, setOrderCode] = (0, import_react.useState)(search.order || "");
	const [mobile, setMobile] = (0, import_react.useState)(search.mobile || "");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [order, setOrder] = (0, import_react.useState)(null);
	const [searched, setSearched] = (0, import_react.useState)(false);
	const [errorMsg, setErrorMsg] = (0, import_react.useState)(null);
	const handleSearch = async (e) => {
		if (e) e.preventDefault();
		if (!orderCode.trim() || !mobile.trim()) {
			setErrorMsg("Please enter both your Order ID and 10-digit Mobile Number.");
			return;
		}
		setLoading(true);
		setErrorMsg(null);
		setSearched(true);
		try {
			const data = await trackOrder(orderCode.trim(), mobile.trim());
			if (!data) {
				setOrder(null);
				setErrorMsg("No order found matching this Order ID and Mobile number. Please verify the information and try again.");
			} else setOrder(data);
		} catch (err) {
			console.error("Tracking lookup error:", err);
			setErrorMsg("Unable to retrieve order status right now. Please check your connection or contact us on WhatsApp.");
			setOrder(null);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (search.order && search.mobile) handleSearch();
	}, [search.order, search.mobile]);
	const currentStepIndex = order ? TIMELINE_STEPS.findIndex((s) => s.key === order.order_status) : -1;
	const isCancelled = order?.order_status === "cancelled";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Order Tracking",
		title: "Track Your Halwa",
		subtitle: "Follow your freshly prepared halwa from our kitchen to your doorstep."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-4xl px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "luxe-card p-6 md:p-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSearch,
				className: "grid gap-4 sm:grid-cols-[1.5fr_1.5fr_auto]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-xs uppercase tracking-wider text-muted-foreground font-medium",
						children: "Order ID"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						required: true,
						placeholder: "e.g. GT-20260921-001",
						value: orderCode,
						onChange: (e) => setOrderCode(e.target.value),
						className: "mt-1.5 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-xs uppercase tracking-wider text-muted-foreground font-medium",
						children: "Mobile Number"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "tel",
						required: true,
						maxLength: 10,
						placeholder: "10-digit mobile number",
						value: mobile,
						onChange: (e) => setMobile(e.target.value.replace(/\D/g, "")),
						className: "mt-1.5 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: loading,
							className: "inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gold px-7 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity",
							children: loading ? "Searching..." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" }), " Track"] })
						})
					})
				]
			}), errorMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-xl border border-destructive/30 bg-destructive/10 p-3.5 text-xs text-destructive flex items-start gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: errorMsg })]
			})]
		}), order && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 luxe-card overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border bg-charcoal p-6 md:p-8 flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs uppercase tracking-widest text-gold font-medium",
						children: "Order Details"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-serif text-foreground mt-1",
						children: order.order_code
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground mt-0.5",
						children: ["Ordered on ", new Date(order.created_at).toLocaleDateString("en-IN", {
							day: "numeric",
							month: "short",
							year: "numeric",
							hour: "2-digit",
							minute: "2-digit"
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 text-xs font-semibold text-gold",
						children: ORDER_STATUS_LABELS[order.order_status] ?? order.order_status
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground",
						children: ["Payment: ", PAYMENT_STATUS_LABELS[order.payment_status] ?? order.payment_status]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 md:p-8",
				children: [
					isCancelled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-destructive/40 bg-destructive/10 p-6 text-center text-destructive",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-8 w-8 mx-auto" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-semibold mt-2",
								children: "This order has been cancelled"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-1",
								children: "Please contact Gold Taste on WhatsApp if you have any questions regarding refunds."
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs uppercase tracking-widest text-gold mb-6",
						children: "Preparation & Delivery Timeline"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative space-y-6 md:space-y-0 md:grid md:grid-cols-7 md:gap-2",
						children: TIMELINE_STEPS.map((step, idx) => {
							const isPast = currentStepIndex > idx;
							const isCurrent = currentStepIndex === idx;
							const StepIcon = step.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex md:flex-col items-start md:items-center text-left md:text-center gap-3 md:gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all ${isPast ? "border-gold bg-gold text-primary-foreground" : isCurrent ? "border-gold bg-gold/20 text-gold shadow-gold ring-4 ring-gold/10" : "border-border bg-card text-muted-foreground"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepIcon, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: `text-xs font-semibold ${isCurrent ? "text-gold" : isPast ? "text-foreground" : "text-muted-foreground"}`,
										children: step.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground hidden sm:block",
										children: step.desc
									})]
								})]
							}, step.key);
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 border-t border-border pt-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xs uppercase tracking-widest text-gold mb-4",
								children: "Items in this order"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "divide-y divide-border rounded-2xl border border-border bg-charcoal",
								children: (order.items ?? []).map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between p-3.5 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium text-foreground",
										children: item.product_name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											item.weight_label,
											" × ",
											item.quantity
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-gold",
										children: formatINR(item.line_total)
									})]
								}, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap justify-between items-center text-xs text-muted-foreground px-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Zone: ", zoneLabel(order.delivery_zone)] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Delivery Fee: ", order.delivery_fee === 0 ? "Free" : formatINR(order.delivery_fee)] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-base font-semibold text-gold",
										children: ["Total: ", formatINR(order.total)]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 border-t border-border pt-6 flex flex-wrap items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Need faster updates or special instructions?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: whatsappLink(`Hello Gold Taste, I would like an update on order ${order.order_code}.`, BRAND.whatsapp),
							target: "_blank",
							rel: "noreferrer",
							className: "inline-flex items-center gap-2 rounded-full border border-gold px-5 py-2 text-xs font-semibold text-gold hover:bg-gold/10 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), " Message Kitchen on WhatsApp"]
						})]
					})
				]
			})]
		})]
	})] });
}
//#endregion
export { TrackOrderPage as component };
