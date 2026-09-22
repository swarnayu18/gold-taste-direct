import { r as __toESM } from "../_runtime.mjs";
import { l as isValidIndianMobile, o as formatINR, p as productImage, u as isValidPincode } from "./brand-DAhpdDak.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as useCart } from "./router-BarUkpGL.mjs";
import { U as ArrowRight, V as Check, W as ArrowLeft, d as ShieldCheck, i as Truck } from "../_libs/lucide-react.mjs";
import { n as SiteLayout, t as PageHeader } from "./SiteLayout-Diear1rn.mjs";
import { S as zoneLabel, n as deliveryFeeFor, r as etaFor, v as useSettings } from "./shop-Bp4shyxJ.mjs";
import { i as saveDraft, n as loadDraft } from "./order-draft-6w9zsJjG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-7N0Lzlnq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CheckoutPage() {
	const navigate = useNavigate();
	const { lines, subtotal } = useCart();
	const { data: settings } = useSettings();
	const initialDraft = loadDraft();
	const [step, setStep] = (0, import_react.useState)(1);
	const [details, setDetails] = (0, import_react.useState)(() => ({
		fullName: initialDraft?.details.fullName ?? "",
		mobile: initialDraft?.details.mobile ?? "",
		whatsapp: initialDraft?.details.whatsapp ?? "",
		email: initialDraft?.details.email ?? "",
		address: initialDraft?.details.address ?? "",
		area: initialDraft?.details.area ?? "",
		city: initialDraft?.details.city || "Malda",
		state: initialDraft?.details.state || "West Bengal",
		pincode: initialDraft?.details.pincode ?? "",
		zone: initialDraft?.details.zone || "malda_town"
	}));
	const [sameAsMobile, setSameAsMobile] = (0, import_react.useState)(!initialDraft?.details.whatsapp || initialDraft.details.whatsapp === initialDraft.details.mobile);
	const deliveryFee = deliveryFeeFor(details.zone, settings?.delivery);
	const total = subtotal + deliveryFee;
	const validateStep1 = () => {
		if (!details.fullName.trim()) {
			toast.error("Please enter your full name.");
			return false;
		}
		if (!isValidIndianMobile(details.mobile)) {
			toast.error("Please enter a valid 10-digit Indian mobile number.");
			return false;
		}
		const wa = sameAsMobile ? details.mobile : details.whatsapp;
		if (wa && !isValidIndianMobile(wa)) {
			toast.error("Please enter a valid 10-digit WhatsApp number.");
			return false;
		}
		return true;
	};
	const validateStep2 = () => {
		if (!details.address.trim()) {
			toast.error("Please enter your delivery street address.");
			return false;
		}
		if (!details.area.trim()) {
			toast.error("Please enter your area or locality.");
			return false;
		}
		if (!details.city.trim()) {
			toast.error("Please enter your city.");
			return false;
		}
		if (!isValidPincode(details.pincode)) {
			toast.error("Please enter a valid 6-digit postal pincode.");
			return false;
		}
		return true;
	};
	const handleNextFromStep1 = (e) => {
		e.preventDefault();
		if (validateStep1()) {
			setStep(2);
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		}
	};
	const handleNextFromStep2 = (e) => {
		e.preventDefault();
		if (validateStep2()) {
			setStep(3);
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		}
	};
	const handleProceedToPayment = () => {
		if (!validateStep1() || !validateStep2()) return;
		if (lines.length === 0) {
			toast.error("Your cart is empty. Please add items before checking out.");
			navigate({ to: "/products" });
			return;
		}
		const draft = {
			details: {
				...details,
				whatsapp: sameAsMobile ? details.mobile : details.whatsapp || details.mobile
			},
			lines,
			subtotal,
			deliveryFee,
			total
		};
		saveDraft(draft);
		navigate({ to: "/payment" });
	};
	if (lines.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Checkout",
		title: "Your Cart is Empty"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-xl px-4 py-16 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "luxe-card p-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg",
					children: "You don't have any halwa in your cart to checkout."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Please browse our freshly prepared halwa selection first."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/products",
					className: "mt-6 inline-flex rounded-full bg-gold px-7 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90",
					children: "Browse Halwa"
				})
			]
		})
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Checkout",
		title: "Delivery Details",
		subtitle: "Complete your details to place your fresh halwa order."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-5xl px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-10 flex items-center justify-between border-b border-border pb-6",
			children: [
				{
					num: 1,
					label: "Customer Info"
				},
				{
					num: 2,
					label: "Delivery Address"
				},
				{
					num: 3,
					label: "Review & Pay"
				}
			].map((s, idx) => {
				const isCompleted = step > s.num;
				const isCurrent = step === s.num;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							if (s.num === 1) setStep(1);
							if (s.num === 2 && validateStep1()) setStep(2);
						},
						className: "flex items-center gap-2 text-left text-xs md:text-sm font-medium transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `inline-flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full text-xs font-semibold ${isCompleted ? "bg-gold text-primary-foreground" : isCurrent ? "border border-gold text-gold" : "border border-border text-muted-foreground"}`,
							children: isCompleted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : s.num
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: isCurrent ? "text-gold font-semibold" : "text-muted-foreground",
							children: s.label
						})]
					}), idx < 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `mx-3 hidden h-px flex-1 sm:block ${isCompleted ? "bg-gold" : "bg-border"}` })]
				}, s.num);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-8 lg:grid-cols-[1.5fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleNextFromStep1,
					className: "luxe-card p-6 md:p-8 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-serif",
							children: "Step 1: Contact Information"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs md:text-sm text-muted-foreground",
							children: "We will use these details to contact you for payment verification and delivery."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs font-medium uppercase tracking-wider text-foreground/80",
									children: ["Full Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-destructive",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									placeholder: "e.g. Rahul Sen",
									value: details.fullName,
									onChange: (e) => setDetails({
										...details,
										fullName: e.target.value
									}),
									className: "mt-2 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs font-medium uppercase tracking-wider text-foreground/80",
									children: ["Mobile Number (10 digits) ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-destructive",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "tel",
									required: true,
									maxLength: 10,
									placeholder: "9876543210",
									value: details.mobile,
									onChange: (e) => setDetails({
										...details,
										mobile: e.target.value.replace(/\D/g, "")
									}),
									className: "mt-2 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pt-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-2 text-sm text-foreground/90 cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: sameAsMobile,
											onChange: (e) => setSameAsMobile(e.target.checked),
											className: "accent-gold h-4 w-4 rounded"
										}), "WhatsApp number is same as mobile number"]
									})
								}),
								!sameAsMobile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs font-medium uppercase tracking-wider text-foreground/80",
									children: ["WhatsApp Number ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-destructive",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "tel",
									maxLength: 10,
									placeholder: "9876543210",
									value: details.whatsapp,
									onChange: (e) => setDetails({
										...details,
										whatsapp: e.target.value.replace(/\D/g, "")
									}),
									className: "mt-2 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-medium uppercase tracking-wider text-foreground/80",
									children: "Email Address (Optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									placeholder: "rahul@example.com",
									value: details.email,
									onChange: (e) => setDetails({
										...details,
										email: e.target.value
									}),
									className: "mt-2 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-4 flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/cart",
								className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to Cart"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								className: "inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity",
								children: ["Next: Delivery Address ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})]
						})
					]
				}),
				step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleNextFromStep2,
					className: "luxe-card p-6 md:p-8 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-serif",
							children: "Step 2: Delivery Address"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs md:text-sm text-muted-foreground",
							children: "Please provide your complete delivery address in or around Malda."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-xs font-medium uppercase tracking-wider text-foreground/80 mb-2",
							children: ["Select Delivery Zone ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-destructive",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: ["malda_town", "outside_malda"].map((zone) => {
								const fee = deliveryFeeFor(zone, settings?.delivery);
								const eta = etaFor(zone, settings?.delivery);
								const isSelected = details.zone === zone;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setDetails({
										...details,
										zone
									}),
									className: `rounded-2xl border p-4 text-left transition-all ${isSelected ? "border-gold bg-gold/10 shadow-gold" : "border-border bg-charcoal hover:border-gold/50"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-sm",
											children: zoneLabel(zone)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-medium text-gold",
											children: fee === 0 ? "Free Delivery" : formatINR(fee)
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-xs text-muted-foreground flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-3.5 w-3.5 text-gold" }),
											" Estimated: ",
											eta
										]
									})]
								}, zone);
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs font-medium uppercase tracking-wider text-foreground/80",
									children: ["Street Address / House / Flat No. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-destructive",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									required: true,
									rows: 2,
									placeholder: "e.g. Flat 3B, Sunshine Apartments, Near Railway Station",
									value: details.address,
									onChange: (e) => setDetails({
										...details,
										address: e.target.value
									}),
									className: "mt-2 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs font-medium uppercase tracking-wider text-foreground/80",
										children: ["Area / Locality ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-destructive",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										required: true,
										placeholder: "e.g. English Bazar",
										value: details.area,
										onChange: (e) => setDetails({
											...details,
											area: e.target.value
										}),
										className: "mt-2 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs font-medium uppercase tracking-wider text-foreground/80",
										children: ["City ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-destructive",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										required: true,
										value: details.city,
										onChange: (e) => setDetails({
											...details,
											city: e.target.value
										}),
										className: "mt-2 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs font-medium uppercase tracking-wider text-foreground/80",
										children: ["State ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-destructive",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										required: true,
										value: details.state,
										onChange: (e) => setDetails({
											...details,
											state: e.target.value
										}),
										className: "mt-2 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs font-medium uppercase tracking-wider text-foreground/80",
										children: ["Pincode (6 digits) ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-destructive",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										required: true,
										maxLength: 6,
										placeholder: "732101",
										value: details.pincode,
										onChange: (e) => setDetails({
											...details,
											pincode: e.target.value.replace(/\D/g, "")
										}),
										className: "mt-2 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
									})] })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-4 flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setStep(1),
								className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to Contact"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								className: "inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity",
								children: ["Next: Review Order ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})]
						})
					]
				}),
				step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "luxe-card p-6 md:p-8 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-serif",
							children: "Step 3: Review Your Order"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs md:text-sm text-muted-foreground",
							children: "Confirm your items, delivery details, and proceed to the UPI payment screen."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-charcoal p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs uppercase tracking-widest text-gold",
											children: "Recipient"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setStep(1),
											className: "text-xs text-muted-foreground hover:text-gold underline",
											children: "Edit"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm font-medium",
										children: details.fullName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground mt-0.5",
										children: ["Mobile: ", details.mobile]
									}),
									details.whatsapp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: ["WhatsApp: ", details.whatsapp]
									}),
									details.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: details.email
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-charcoal p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs uppercase tracking-widest text-gold",
											children: "Delivery"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setStep(2),
											className: "text-xs text-muted-foreground hover:text-gold underline",
											children: "Edit"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm font-medium",
										children: zoneLabel(details.zone)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground mt-0.5",
										children: [
											details.address,
											", ",
											details.area,
											", ",
											details.city,
											" - ",
											details.pincode
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-gold",
										children: ["ETA: ", etaFor(details.zone, settings?.delivery)]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs uppercase tracking-widest text-gold",
								children: "Halwa Selection"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "divide-y divide-border rounded-xl border border-border bg-charcoal",
								children: lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: productImage(l.slug, l.imageUrl),
											alt: l.name,
											className: "h-12 w-12 rounded-lg object-cover"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-medium truncate",
												children: l.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-muted-foreground",
												children: [
													l.weightLabel,
													" × ",
													l.quantity
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium text-gold",
											children: formatINR(l.price * l.quantity)
										})
									]
								}, `${l.slug}-${l.weightLabel}`))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-gold/30 bg-gold/5 p-4 text-xs text-muted-foreground flex items-start gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-gold shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: "Transparent Ordering:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5",
								children: "On the next screen you can scan our UPI QR or use your UPI app. You will then confirm your order on WhatsApp where our team verifies your payment before cooking."
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-4 flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setStep(2),
								className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to Address"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: handleProceedToPayment,
								className: "inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity",
								children: ["Continue to Payment ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})]
						})
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "luxe-card h-fit p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xl font-serif",
						children: "Order Summary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "divide-y divide-border text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "py-2.5 flex justify-between text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Items (",
									lines.reduce((s, l) => s + l.quantity, 0),
									")"
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground",
									children: formatINR(subtotal)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "py-2.5 flex justify-between text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Delivery (",
									zoneLabel(details.zone),
									")"
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground",
									children: deliveryFee === 0 ? "Free" : formatINR(deliveryFee)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "py-3 flex justify-between text-base font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Amount" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gold text-lg",
									children: formatINR(total)
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: ["Estimated delivery: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gold",
							children: etaFor(details.zone, settings?.delivery)
						})]
					})
				]
			})]
		})]
	})] });
}
//#endregion
export { CheckoutPage as component };
