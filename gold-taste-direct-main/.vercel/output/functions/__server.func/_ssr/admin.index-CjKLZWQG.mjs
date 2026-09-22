import { r as __toESM } from "../_runtime.mjs";
import { d as logoImage, m as whatsappLink, o as formatINR, r as ORDER_STATUS_LABELS, t as BRAND } from "./brand-DAhpdDak.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { B as CircleAlert, C as MessageCircle, D as LogOut, F as DollarSign, H as Building2, L as CookingPot, N as Eye, R as Clock, _ as QrCode, a as Trash2, b as Package, f as Settings, g as RefreshCw, h as Save, i as Truck, j as Image, l as ShoppingBag, m as Search, o as SquarePen, r as Users, v as Plus } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-BFqeEf5p.mjs";
import { S as zoneLabel, _ as useSaveSetting, b as useUpdateOrder, c as useCreateGalleryItem, d as useDeleteGalleryItem, f as useDeleteProduct, g as useProducts, l as useCreateProduct, m as useGallery, p as useDeleteTestimonial, s as useAdminOrders, u as useCreateTestimonial, v as useSettings, x as useUpdateProduct, y as useTestimonials } from "./shop-Bp4shyxJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-CjKLZWQG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminDashboardPage() {
	const navigate = useNavigate();
	const [tab, setTab] = (0, import_react.useState)("overview");
	const [authChecked, setAuthChecked] = (0, import_react.useState)(false);
	const { data: orders = [], isLoading: ordersLoading, refetch: refetchOrders } = useAdminOrders();
	const { data: products = [], isLoading: productsLoading } = useProducts(true);
	const { data: settings, isLoading: settingsLoading } = useSettings();
	const { data: gallery = [] } = useGallery(true);
	const { data: testimonials = [] } = useTestimonials(true);
	const updateOrder = useUpdateOrder();
	const saveSetting = useSaveSetting();
	const createProduct = useCreateProduct();
	const updateProduct = useUpdateProduct();
	const deleteProduct = useDeleteProduct();
	const createGallery = useCreateGalleryItem();
	const deleteGallery = useDeleteGalleryItem();
	const createTestimonial = useCreateTestimonial();
	const deleteTestimonial = useDeleteTestimonial();
	(0, import_react.useEffect)(() => {
		if (sessionStorage.getItem("goldtaste_admin_preview") === "true") {
			setAuthChecked(true);
			return;
		}
		supabase.auth.getSession().then(({ data: { session } }) => {
			if (!session) navigate({ to: "/admin/login" });
			else setAuthChecked(true);
		});
	}, [navigate]);
	const handleSignOut = async () => {
		sessionStorage.removeItem("goldtaste_admin_preview");
		await supabase.auth.signOut();
		toast.success("Signed out successfully");
		navigate({ to: "/admin/login" });
	};
	const [orderFilter, setOrderFilter] = (0, import_react.useState)("all");
	const [orderSearch, setOrderSearch] = (0, import_react.useState)("");
	const [selectedOrder, setSelectedOrder] = (0, import_react.useState)(null);
	const filteredOrders = (0, import_react.useMemo)(() => {
		return orders.filter((o) => {
			const matchStatus = orderFilter === "all" || o.order_status === orderFilter;
			const q = orderSearch.toLowerCase().trim();
			const matchSearch = !q || o.order_code.toLowerCase().includes(q) || o.customer_name.toLowerCase().includes(q) || o.mobile.includes(q);
			return matchStatus && matchSearch;
		});
	}, [
		orders,
		orderFilter,
		orderSearch
	]);
	const metrics = (0, import_react.useMemo)(() => {
		const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
		const todayOrders = orders.filter((o) => o.created_at.startsWith(today));
		const pendingVerification = orders.filter((o) => o.order_status === "payment_verification" || o.payment_status === "paid_by_customer");
		const inPrep = orders.filter((o) => o.order_status === "preparing");
		const delivered = orders.filter((o) => o.order_status === "delivered");
		const totalRev = orders.filter((o) => o.payment_status === "verified" || o.order_status === "delivered").reduce((sum, o) => sum + Number(o.total || 0), 0);
		return {
			todayCount: todayOrders.length,
			pendingVerificationCount: pendingVerification.length,
			inPrepCount: inPrep.length,
			deliveredCount: delivered.length,
			totalRevenue: totalRev,
			totalOrders: orders.length
		};
	}, [orders]);
	const [productModal, setProductModal] = (0, import_react.useState)({
		open: false,
		mode: "create"
	});
	const [productForm, setProductForm] = (0, import_react.useState)({
		name: "",
		slug: "",
		short_description: "",
		description: "",
		ingredients: "",
		image_url: "",
		is_active: true,
		is_featured: false,
		in_stock: true,
		price_is_placeholder: false,
		p250: 150,
		p500: 280,
		p1kg: 540
	});
	const openNewProductModal = () => {
		setProductForm({
			name: "",
			slug: "",
			short_description: "",
			description: "",
			ingredients: "",
			image_url: "",
			is_active: true,
			is_featured: false,
			in_stock: true,
			price_is_placeholder: false,
			p250: 150,
			p500: 280,
			p1kg: 540
		});
		setProductModal({
			open: true,
			mode: "create"
		});
	};
	const openEditProductModal = (p) => {
		const v250 = p.product_variants.find((v) => v.weight_label === "250g")?.price ?? 150;
		const v500 = p.product_variants.find((v) => v.weight_label === "500g")?.price ?? 280;
		const v1kg = p.product_variants.find((v) => v.weight_label === "1kg")?.price ?? 540;
		setProductForm({
			name: p.name,
			slug: p.slug,
			short_description: p.short_description || "",
			description: p.description || "",
			ingredients: p.ingredients || "",
			image_url: p.image_url || "",
			is_active: p.is_active,
			is_featured: p.is_featured,
			in_stock: p.in_stock,
			price_is_placeholder: p.price_is_placeholder,
			p250: Number(v250),
			p500: Number(v500),
			p1kg: Number(v1kg)
		});
		setProductModal({
			open: true,
			mode: "edit",
			data: p
		});
	};
	const handleSaveProduct = async (e) => {
		e.preventDefault();
		if (!productForm.name.trim()) {
			toast.error("Please provide a product name");
			return;
		}
		const slug = productForm.slug.trim() || productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
		try {
			if (productModal.mode === "create") {
				await createProduct.mutateAsync({
					name: productForm.name,
					slug,
					short_description: productForm.short_description,
					description: productForm.description,
					ingredients: productForm.ingredients,
					image_url: productForm.image_url || void 0,
					is_active: productForm.is_active,
					is_featured: productForm.is_featured,
					in_stock: productForm.in_stock,
					price_is_placeholder: productForm.price_is_placeholder,
					variants: [
						{
							weight_label: "250g",
							price: productForm.p250,
							sort_order: 1
						},
						{
							weight_label: "500g",
							price: productForm.p500,
							sort_order: 2
						},
						{
							weight_label: "1kg",
							price: productForm.p1kg,
							sort_order: 3
						}
					]
				});
				toast.success("Product created successfully");
			} else if (productModal.data?.id) {
				const existingVariants = productModal.data.product_variants ?? [];
				const v250 = existingVariants.find((v) => v.weight_label === "250g");
				const v500 = existingVariants.find((v) => v.weight_label === "500g");
				const v1kg = existingVariants.find((v) => v.weight_label === "1kg");
				await updateProduct.mutateAsync({
					id: productModal.data.id,
					name: productForm.name,
					slug,
					short_description: productForm.short_description,
					description: productForm.description,
					ingredients: productForm.ingredients,
					image_url: productForm.image_url,
					is_active: productForm.is_active,
					is_featured: productForm.is_featured,
					in_stock: productForm.in_stock,
					price_is_placeholder: productForm.price_is_placeholder,
					variants: [
						{
							id: v250?.id,
							weight_label: "250g",
							price: productForm.p250,
							sort_order: 1
						},
						{
							id: v500?.id,
							weight_label: "500g",
							price: productForm.p500,
							sort_order: 2
						},
						{
							id: v1kg?.id,
							weight_label: "1kg",
							price: productForm.p1kg,
							sort_order: 3
						}
					]
				});
				toast.success("Product updated successfully");
			}
			setProductModal({
				open: false,
				mode: "create"
			});
		} catch (err) {
			console.error("Save product error:", err);
			toast.error(err instanceof Error ? err.message : "Failed to save product");
		}
	};
	const [upiForm, setUpiForm] = (0, import_react.useState)({
		upi_id: "YOUR-UPI-ID@upi",
		merchant_name: "Gold Taste",
		qr_image_url: "",
		is_placeholder: true
	});
	const [deliveryForm, setDeliveryForm] = (0, import_react.useState)({
		malda_fee: 0,
		outside_fee: 40,
		malda_eta: "1–2 days",
		outside_eta: "2–3 days",
		minimum_order: 0
	});
	const [contactForm, setContactForm] = (0, import_react.useState)({
		phone: BRAND.phone,
		whatsapp: BRAND.whatsapp,
		email: BRAND.email,
		address: BRAND.address,
		maps_embed_url: ""
	});
	(0, import_react.useEffect)(() => {
		if (settings) {
			if (settings.upi) setUpiForm(settings.upi);
			if (settings.delivery) setDeliveryForm(settings.delivery);
			if (settings.contact) setContactForm(settings.contact);
		}
	}, [settings]);
	const [newGalleryUrl, setNewGalleryUrl] = (0, import_react.useState)("");
	const [newGalleryCaption, setNewGalleryCaption] = (0, import_react.useState)("");
	const [newTestimonial, setNewTestimonial] = (0, import_react.useState)({
		name: "",
		location: "Malda",
		message: ""
	});
	if (!authChecked) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-10 animate-spin rounded-full border-2 border-gold border-t-transparent mx-auto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-muted-foreground",
				children: "Checking credentials..."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-40 border-b border-border bg-charcoal/95 backdrop-blur px-4 py-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: logoImage,
						alt: "Logo",
						className: "h-9 w-auto"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-serif text-lg text-gold font-semibold",
						children: "Gold Taste Admin"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 text-[10px] text-gold font-mono uppercase",
						children: "Owner Portal"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						target: "_blank",
						className: "hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" }), " View Storefront"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleSignOut,
						className: "inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground hover:text-destructive hover:border-destructive transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), " Sign Out"]
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-7xl flex-1 px-4 py-6 md:py-8 flex flex-col md:flex-row gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "w-full md:w-56 shrink-0 space-y-1",
				children: [
					{
						id: "overview",
						label: "Overview",
						icon: Building2
					},
					{
						id: "orders",
						label: `Orders (${orders.length})`,
						icon: ShoppingBag
					},
					{
						id: "products",
						label: `Products (${products.length})`,
						icon: Package
					},
					{
						id: "upi",
						label: "UPI & QR",
						icon: QrCode
					},
					{
						id: "delivery",
						label: "Delivery Charges",
						icon: Truck
					},
					{
						id: "contact",
						label: "Store Contact",
						icon: Settings
					},
					{
						id: "gallery",
						label: "Gallery Photos",
						icon: Image
					},
					{
						id: "testimonials",
						label: "Testimonials",
						icon: Users
					}
				].map((item) => {
					const Icon = item.icon;
					const active = tab === item.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setTab(item.id),
						className: `flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all ${active ? "bg-gold text-primary-foreground font-semibold shadow-gold" : "text-muted-foreground hover:bg-card hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), item.label]
					}, item.id);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1 min-w-0",
				children: [
					tab === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-serif",
								children: "Kitchen Dashboard"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-0.5",
								children: "Real-time status of halwa orders, revenue and preparation."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "luxe-card p-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs uppercase tracking-wider text-muted-foreground",
													children: "Today's Orders"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-gold" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-3 text-3xl font-serif text-foreground",
												children: metrics.todayCount
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-[11px] text-muted-foreground",
												children: "Placed today"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "luxe-card p-5 border-gold/40",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs uppercase tracking-wider text-gold",
													children: "Payment Verification"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 text-gold" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-3 text-3xl font-serif text-gold",
												children: metrics.pendingVerificationCount
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-[11px] text-muted-foreground",
												children: "Needs UPI confirmation"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "luxe-card p-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs uppercase tracking-wider text-muted-foreground",
													children: "In Preparation"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CookingPot, { className: "h-4 w-4 text-gold" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-3 text-3xl font-serif text-foreground",
												children: metrics.inPrepCount
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-[11px] text-muted-foreground",
												children: "Currently cooking"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "luxe-card p-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs uppercase tracking-wider text-muted-foreground",
													children: "Total Revenue"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-4 w-4 text-gold" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-3 text-2xl font-serif text-gold",
												children: formatINR(metrics.totalRevenue)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1 text-[11px] text-muted-foreground",
												children: [
													"From ",
													metrics.totalOrders,
													" total orders"
												]
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "luxe-card p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-lg font-serif",
										children: "Recent Orders"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setTab("orders"),
										className: "text-xs text-gold hover:underline",
										children: "View All Orders →"
									})]
								}), orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground py-6 text-center",
									children: "No orders have been received yet. Test by placing one from the storefront!"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-x-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										className: "w-full text-left text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
											className: "border-b border-border text-muted-foreground uppercase text-[10px]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-2.5",
													children: "Order ID"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-2.5",
													children: "Customer"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-2.5",
													children: "Zone"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-2.5",
													children: "Total"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-2.5",
													children: "Status"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-2.5",
													children: "Action"
												})
											] })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
											className: "divide-y divide-border",
											children: orders.slice(0, 5).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
												className: "hover:bg-charcoal/50",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-3 font-mono font-medium text-foreground",
														children: o.order_code
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														className: "py-3",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "font-medium",
															children: o.customer_name
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-[11px] text-muted-foreground",
															children: o.mobile
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-3 text-muted-foreground",
														children: zoneLabel(o.delivery_zone)
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-3 font-semibold text-gold",
														children: formatINR(o.total)
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-3",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[10px] text-gold font-medium",
															children: ORDER_STATUS_LABELS[o.order_status] ?? o.order_status
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-3",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => {
																setSelectedOrder(o);
																setTab("orders");
															},
															className: "text-gold hover:underline",
															children: "View Details"
														})
													})
												]
											}, o.id))
										})]
									})
								})]
							})
						]
					}),
					tab === "orders" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-2xl font-serif",
									children: "Orders Management"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: "Verify customer payments, track kitchen status and update orders."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => refetchOrders(),
									className: "inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground hover:text-gold hover:border-gold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5" }), " Refresh"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex-1 min-w-[200px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-2.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										placeholder: "Search by Order ID, name or phone...",
										value: orderSearch,
										onChange: (e) => setOrderSearch(e.target.value),
										className: "w-full rounded-xl border border-border bg-charcoal pl-10 pr-4 py-2 text-xs text-foreground focus:border-gold focus:outline-none"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-1.5 overflow-x-auto py-1",
									children: [
										{
											id: "all",
											label: "All"
										},
										{
											id: "payment_verification",
											label: "Pending Verification"
										},
										{
											id: "confirmed",
											label: "Confirmed"
										},
										{
											id: "preparing",
											label: "Preparing"
										},
										{
											id: "ready",
											label: "Ready"
										},
										{
											id: "dispatched",
											label: "Out for Delivery"
										},
										{
											id: "delivered",
											label: "Delivered"
										}
									].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setOrderFilter(f.id),
										className: `rounded-full px-3 py-1 text-[11px] font-medium whitespace-nowrap transition-colors ${orderFilter === f.id ? "bg-gold text-primary-foreground font-semibold" : "border border-border text-muted-foreground hover:text-foreground"}`,
										children: f.label
									}, f.id))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "luxe-card overflow-hidden",
								children: filteredOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-center text-xs text-muted-foreground py-12",
									children: "No orders match the current filter or search query."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-x-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										className: "w-full text-left text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
											className: "border-b border-border bg-charcoal text-muted-foreground uppercase text-[10px]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3.5",
													children: "Order"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3.5",
													children: "Customer"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3.5",
													children: "Items"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3.5",
													children: "Total"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3.5",
													children: "Payment"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3.5",
													children: "Order Status"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3.5 text-right",
													children: "Actions"
												})
											] })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
											className: "divide-y divide-border",
											children: filteredOrders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
												className: "hover:bg-charcoal/40 transition-colors",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														className: "p-3.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-mono font-bold text-foreground",
															children: o.order_code
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-[10px] text-muted-foreground mt-0.5",
															children: new Date(o.created_at).toLocaleDateString("en-IN", {
																day: "numeric",
																month: "short",
																hour: "2-digit",
																minute: "2-digit"
															})
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														className: "p-3.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "font-medium text-foreground",
																children: o.customer_name
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-muted-foreground",
																children: o.mobile
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[10px] text-muted-foreground",
																children: zoneLabel(o.delivery_zone)
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-3.5",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "space-y-0.5 max-w-[200px]",
															children: (o.order_items ?? []).map((it, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																className: "truncate text-muted-foreground",
																children: [
																	it.product_name,
																	" (",
																	it.weight_label,
																	") × ",
																	it.quantity
																]
															}, idx))
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-3.5 font-bold text-gold",
														children: formatINR(o.total)
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-3.5",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
															value: o.payment_status,
															onChange: (e) => updateOrder.mutate({
																id: o.id,
																payment_status: e.target.value
															}),
															className: "rounded-lg border border-border bg-charcoal px-2 py-1 text-[11px] text-foreground focus:border-gold focus:outline-none",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "pending",
																	children: "Pending"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "paid_by_customer",
																	children: "Paid by Customer"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "verified",
																	children: "Verified ✅"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "rejected",
																	children: "Rejected ❌"
																})
															]
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "p-3.5",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
															value: o.order_status,
															onChange: (e) => updateOrder.mutate({
																id: o.id,
																order_status: e.target.value
															}),
															className: "rounded-lg border border-border bg-charcoal px-2 py-1 text-[11px] text-foreground focus:border-gold focus:outline-none",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "pending",
																	children: "Payment Pending"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "payment_verification",
																	children: "Payment Verification"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "confirmed",
																	children: "Confirmed"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "preparing",
																	children: "Preparing"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "ready",
																	children: "Ready for Dispatch"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "dispatched",
																	children: "Out for Delivery"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "delivered",
																	children: "Delivered"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "cancelled",
																	children: "Cancelled"
																})
															]
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														className: "p-3.5 text-right space-x-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
															href: whatsappLink(`Hello ${o.customer_name}, regarding your Gold Taste order ${o.order_code}: status is now ${ORDER_STATUS_LABELS[o.order_status] || o.order_status}.`, o.whatsapp || o.mobile),
															target: "_blank",
															rel: "noreferrer",
															title: "Open WhatsApp chat with customer",
															className: "inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-[11px] text-gold hover:bg-gold/20",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-3 w-3" }), " WhatsApp"]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => setSelectedOrder(o),
															className: "rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground",
															children: "Details"
														})]
													})
												]
											}, o.id))
										})]
									})
								})
							}),
							selectedOrder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4",
								onClick: () => setSelectedOrder(null),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative max-w-2xl w-full rounded-2xl border border-gold/40 bg-card p-6 shadow-luxe max-h-[90vh] overflow-y-auto",
									onClick: (e) => e.stopPropagation(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between border-b border-border pb-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs uppercase tracking-widest text-gold font-medium",
											children: "Order Details"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-2xl font-serif mt-1",
											children: selectedOrder.order_code
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setSelectedOrder(null),
											className: "rounded-full border border-border p-1.5 text-muted-foreground hover:text-foreground",
											children: "✕"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 space-y-4 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid gap-3 sm:grid-cols-2 rounded-xl border border-border bg-charcoal p-3.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-muted-foreground uppercase text-[10px]",
														children: "Customer"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-semibold text-sm mt-0.5 text-foreground",
														children: selectedOrder.customer_name
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-muted-foreground mt-0.5",
														children: ["Mobile: ", selectedOrder.mobile]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-muted-foreground",
														children: ["WhatsApp: ", selectedOrder.whatsapp || selectedOrder.mobile]
													}),
													selectedOrder.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-muted-foreground",
														children: ["Email: ", selectedOrder.email]
													})
												] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-muted-foreground uppercase text-[10px]",
														children: "Delivery Address"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "font-medium text-foreground mt-0.5",
														children: [
															selectedOrder.address,
															", ",
															selectedOrder.area
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-muted-foreground",
														children: [
															selectedOrder.city,
															", ",
															selectedOrder.state,
															" - ",
															selectedOrder.pincode
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-gold font-medium mt-1",
														children: ["Zone: ", zoneLabel(selectedOrder.delivery_zone)]
													})
												] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] uppercase tracking-wider text-muted-foreground mb-2",
												children: "Ordered Items"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "divide-y divide-border rounded-xl border border-border bg-charcoal",
												children: (selectedOrder.order_items ?? []).map((it, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between p-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-medium text-foreground",
														children: it.product_name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-muted-foreground",
														children: [
															it.weight_label,
															" × ",
															it.quantity,
															" (@ ",
															formatINR(it.unit_price),
															")"
														]
													})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-gold",
														children: formatINR(it.line_total)
													})]
												}, idx))
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl border border-border bg-charcoal p-3 space-y-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between text-muted-foreground",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatINR(selectedOrder.subtotal) })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between text-muted-foreground",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Delivery Fee" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatINR(selectedOrder.delivery_fee) })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hairline-gold my-1" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between font-bold text-sm",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Grand Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-gold",
															children: formatINR(selectedOrder.total)
														})]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] uppercase tracking-wider text-muted-foreground mb-1",
												children: "Admin Kitchen Notes"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												rows: 2,
												defaultValue: selectedOrder.admin_notes || "",
												placeholder: "e.g. Extra dry fruits requested, customer paid via GPay txn #...",
												onBlur: (e) => updateOrder.mutate({
													id: selectedOrder.id,
													admin_notes: e.target.value
												}),
												className: "w-full rounded-xl border border-border bg-charcoal p-2.5 text-xs text-foreground focus:border-gold focus:outline-none"
											})] })
										]
									})]
								})
							})
						]
					}),
					tab === "products" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-2xl font-serif",
									children: "Halwa Catalog"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: "Configure names, descriptions, weight variants, pricing, and stock status."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: openNewProductModal,
									className: "inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add Halwa"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
								children: products.map((p) => {
									const variants = p.product_variants ?? [];
									variants[0]?.price;
									variants[variants.length - 1]?.price;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "luxe-card p-5 flex flex-col justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "font-serif text-lg font-medium",
													children: p.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `rounded-full px-2 py-0.5 text-[10px] font-semibold ${p.in_stock ? "bg-success/15 text-success border border-success/30" : "bg-destructive/15 text-destructive border border-destructive/30"}`,
													children: p.in_stock ? "In Stock" : "Out of Stock"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-xs text-muted-foreground line-clamp-2",
												children: p.short_description || p.description
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-4 flex flex-wrap gap-1.5",
												children: variants.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "rounded-lg border border-border bg-charcoal px-2 py-1 text-[11px]",
													children: [
														v.weight_label,
														":",
														" ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
															className: "text-gold",
															children: formatINR(Number(v.price))
														})
													]
												}, v.id))
											}),
											p.price_is_placeholder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-[10px] text-gold",
												children: "Placeholder price"
											})
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-5 border-t border-border pt-4 flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => updateProduct.mutate({
													id: p.id,
													in_stock: !p.in_stock
												}),
												className: "text-xs text-muted-foreground hover:text-gold",
												children: ["Toggle ", p.in_stock ? "Out of Stock" : "In Stock"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => openEditProductModal(p),
													className: "rounded-full border border-border p-1.5 text-muted-foreground hover:text-gold hover:border-gold",
													title: "Edit Halwa",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-3.5 w-3.5" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => {
														if (confirm(`Are you sure you want to delete ${p.name}?`)) deleteProduct.mutate(p.id);
													},
													className: "rounded-full border border-border p-1.5 text-muted-foreground hover:text-destructive hover:border-destructive",
													title: "Delete Halwa",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
												})]
											})]
										})]
									}, p.id);
								})
							}),
							productModal.open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4",
								onClick: () => setProductModal({
									open: false,
									mode: "create"
								}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative max-w-xl w-full rounded-2xl border border-gold/40 bg-card p-6 shadow-luxe max-h-[90vh] overflow-y-auto",
									onClick: (e) => e.stopPropagation(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xl font-serif mb-4",
										children: productModal.mode === "create" ? "Add New Halwa" : "Edit Halwa Details"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										onSubmit: handleSaveProduct,
										className: "space-y-4 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-[11px] uppercase tracking-wider text-muted-foreground font-medium",
												children: "Product Name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												required: true,
												value: productForm.name,
												onChange: (e) => setProductForm({
													...productForm,
													name: e.target.value
												}),
												className: "mt-1 w-full rounded-xl border border-border bg-charcoal px-3 py-2 text-sm text-foreground focus:border-gold focus:outline-none"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-[11px] uppercase tracking-wider text-muted-foreground font-medium",
												children: "Short Description"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: productForm.short_description,
												onChange: (e) => setProductForm({
													...productForm,
													short_description: e.target.value
												}),
												className: "mt-1 w-full rounded-xl border border-border bg-charcoal px-3 py-2 text-xs text-foreground focus:border-gold focus:outline-none"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-[11px] uppercase tracking-wider text-muted-foreground font-medium",
												children: "Detailed Description"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												rows: 2,
												value: productForm.description,
												onChange: (e) => setProductForm({
													...productForm,
													description: e.target.value
												}),
												className: "mt-1 w-full rounded-xl border border-border bg-charcoal px-3 py-2 text-xs text-foreground focus:border-gold focus:outline-none"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-[11px] uppercase tracking-wider text-muted-foreground font-medium",
												children: "Ingredients"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: productForm.ingredients,
												onChange: (e) => setProductForm({
													...productForm,
													ingredients: e.target.value
												}),
												className: "mt-1 w-full rounded-xl border border-border bg-charcoal px-3 py-2 text-xs text-foreground focus:border-gold focus:outline-none"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-[11px] uppercase tracking-wider text-muted-foreground font-medium",
												children: "Image URL (Optional)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "url",
												placeholder: "https://...",
												value: productForm.image_url,
												onChange: (e) => setProductForm({
													...productForm,
													image_url: e.target.value
												}),
												className: "mt-1 w-full rounded-xl border border-border bg-charcoal px-3 py-2 text-xs text-foreground focus:border-gold focus:outline-none"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "border-t border-border pt-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] uppercase tracking-wider text-gold font-medium mb-3",
													children: "Weight Variant Prices (₹ INR)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid grid-cols-3 gap-3",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "block text-[10px] text-muted-foreground",
															children: "250g Price"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "number",
															min: 0,
															value: productForm.p250,
															onChange: (e) => setProductForm({
																...productForm,
																p250: Number(e.target.value)
															}),
															className: "mt-1 w-full rounded-xl border border-border bg-charcoal px-3 py-2 text-sm text-foreground focus:border-gold focus:outline-none"
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "block text-[10px] text-muted-foreground",
															children: "500g Price"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "number",
															min: 0,
															value: productForm.p500,
															onChange: (e) => setProductForm({
																...productForm,
																p500: Number(e.target.value)
															}),
															className: "mt-1 w-full rounded-xl border border-border bg-charcoal px-3 py-2 text-sm text-foreground focus:border-gold focus:outline-none"
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "block text-[10px] text-muted-foreground",
															children: "1kg Price"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "number",
															min: 0,
															value: productForm.p1kg,
															onChange: (e) => setProductForm({
																...productForm,
																p1kg: Number(e.target.value)
															}),
															className: "mt-1 w-full rounded-xl border border-border bg-charcoal px-3 py-2 text-sm text-foreground focus:border-gold focus:outline-none"
														})] })
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap gap-4 pt-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
														className: "flex items-center gap-2 cursor-pointer",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "checkbox",
															checked: productForm.in_stock,
															onChange: (e) => setProductForm({
																...productForm,
																in_stock: e.target.checked
															}),
															className: "accent-gold h-4 w-4"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "In Stock" })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
														className: "flex items-center gap-2 cursor-pointer",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "checkbox",
															checked: productForm.is_featured,
															onChange: (e) => setProductForm({
																...productForm,
																is_featured: e.target.checked
															}),
															className: "accent-gold h-4 w-4"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Featured on Homepage" })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
														className: "flex items-center gap-2 cursor-pointer",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "checkbox",
															checked: productForm.price_is_placeholder,
															onChange: (e) => setProductForm({
																...productForm,
																price_is_placeholder: e.target.checked
															}),
															className: "accent-gold h-4 w-4"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Show Placeholder Label" })]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "pt-4 flex justify-end gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setProductModal({
														open: false,
														mode: "create"
													}),
													className: "rounded-full border border-border px-5 py-2 text-xs text-muted-foreground",
													children: "Cancel"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "submit",
													className: "rounded-full bg-gold px-6 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90",
													children: "Save Halwa"
												})]
											})
										]
									})]
								})
							})
						]
					}),
					tab === "upi" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-serif",
							children: "UPI & Payment Settings"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: "Set the UPI ID and QR code that customers will scan during checkout."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "luxe-card p-6 md:p-8 max-w-2xl space-y-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: async (e) => {
									e.preventDefault();
									await saveSetting.mutateAsync({
										key: "upi",
										value: upiForm
									});
									toast.success("UPI settings saved successfully");
								},
								className: "space-y-4 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "block text-[11px] uppercase tracking-wider text-muted-foreground font-medium",
											children: ["UPI ID / VPA ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-destructive",
												children: "*"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											required: true,
											placeholder: "e.g. goldtaste@okhdfcbank",
											value: upiForm.upi_id,
											onChange: (e) => setUpiForm({
												...upiForm,
												upi_id: e.target.value
											}),
											className: "mt-1 w-full rounded-xl border border-border bg-charcoal px-3.5 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-[10px] text-muted-foreground",
											children: "This will be shown to customers and embedded into the payment link."
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[11px] uppercase tracking-wider text-muted-foreground font-medium",
										children: "Merchant / Payee Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										required: true,
										value: upiForm.merchant_name,
										onChange: (e) => setUpiForm({
											...upiForm,
											merchant_name: e.target.value
										}),
										className: "mt-1 w-full rounded-xl border border-border bg-charcoal px-3.5 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[11px] uppercase tracking-wider text-muted-foreground font-medium",
										children: "Custom UPI QR Image URL (Optional)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "url",
										placeholder: "https://... (or leave empty to generate QR dynamically)",
										value: upiForm.qr_image_url,
										onChange: (e) => setUpiForm({
											...upiForm,
											qr_image_url: e.target.value
										}),
										className: "mt-1 w-full rounded-xl border border-border bg-charcoal px-3.5 py-2.5 text-xs text-foreground focus:border-gold focus:outline-none"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pt-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-2 cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: upiForm.is_placeholder,
												onChange: (e) => setUpiForm({
													...upiForm,
													is_placeholder: e.target.checked
												}),
												className: "accent-gold h-4 w-4"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Mark as placeholder UPI ID (shows demo banner to customers)" })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pt-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "submit",
											disabled: saveSetting.isPending,
											className: "inline-flex items-center gap-2 rounded-full bg-gold px-7 py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save UPI Configuration"]
										})
									})
								]
							})
						})]
					}),
					tab === "delivery" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-serif",
							children: "Delivery Settings"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: "Adjust delivery fees, estimated delivery timelines and minimum order values."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "luxe-card p-6 md:p-8 max-w-2xl space-y-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: async (e) => {
									e.preventDefault();
									await saveSetting.mutateAsync({
										key: "delivery",
										value: deliveryForm
									});
									toast.success("Delivery settings saved successfully");
								},
								className: "space-y-4 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-[11px] uppercase tracking-wider text-muted-foreground font-medium",
												children: "Malda Town Delivery Fee (₹)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												min: 0,
												value: deliveryForm.malda_fee,
												onChange: (e) => setDeliveryForm({
													...deliveryForm,
													malda_fee: Number(e.target.value)
												}),
												className: "mt-1 w-full rounded-xl border border-border bg-charcoal px-3.5 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-[10px] text-muted-foreground",
												children: "0 for free delivery"
											})
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[11px] uppercase tracking-wider text-muted-foreground font-medium",
											children: "Malda Town ETA"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: deliveryForm.malda_eta,
											onChange: (e) => setDeliveryForm({
												...deliveryForm,
												malda_eta: e.target.value
											}),
											className: "mt-1 w-full rounded-xl border border-border bg-charcoal px-3.5 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[11px] uppercase tracking-wider text-muted-foreground font-medium",
											children: "Outside Malda Delivery Fee (₹)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											min: 0,
											value: deliveryForm.outside_fee,
											onChange: (e) => setDeliveryForm({
												...deliveryForm,
												outside_fee: Number(e.target.value)
											}),
											className: "mt-1 w-full rounded-xl border border-border bg-charcoal px-3.5 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[11px] uppercase tracking-wider text-muted-foreground font-medium",
											children: "Outside Malda ETA"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: deliveryForm.outside_eta,
											onChange: (e) => setDeliveryForm({
												...deliveryForm,
												outside_eta: e.target.value
											}),
											className: "mt-1 w-full rounded-xl border border-border bg-charcoal px-3.5 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[11px] uppercase tracking-wider text-muted-foreground font-medium",
											children: "Minimum Order Amount (₹)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											min: 0,
											value: deliveryForm.minimum_order,
											onChange: (e) => setDeliveryForm({
												...deliveryForm,
												minimum_order: Number(e.target.value)
											}),
											className: "mt-1 w-full rounded-xl border border-border bg-charcoal px-3.5 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-[10px] text-muted-foreground",
											children: "0 for no minimum"
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pt-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "submit",
											disabled: saveSetting.isPending,
											className: "inline-flex items-center gap-2 rounded-full bg-gold px-7 py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save Delivery Settings"]
										})
									})
								]
							})
						})]
					}),
					tab === "contact" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-serif",
							children: "Store & Contact Settings"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: "Update phone numbers, WhatsApp link recipient, address and email."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "luxe-card p-6 md:p-8 max-w-2xl space-y-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: async (e) => {
									e.preventDefault();
									await saveSetting.mutateAsync({
										key: "contact",
										value: contactForm
									});
									toast.success("Contact settings saved successfully");
								},
								className: "space-y-4 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[11px] uppercase tracking-wider text-muted-foreground font-medium",
											children: "Phone Number"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: contactForm.phone,
											onChange: (e) => setContactForm({
												...contactForm,
												phone: e.target.value
											}),
											className: "mt-1 w-full rounded-xl border border-border bg-charcoal px-3.5 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[11px] uppercase tracking-wider text-muted-foreground font-medium",
											children: "WhatsApp Number (Order Notifications)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: contactForm.whatsapp,
											onChange: (e) => setContactForm({
												...contactForm,
												whatsapp: e.target.value
											}),
											className: "mt-1 w-full rounded-xl border border-border bg-charcoal px-3.5 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[11px] uppercase tracking-wider text-muted-foreground font-medium",
										children: "Email Address"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										value: contactForm.email,
										onChange: (e) => setContactForm({
											...contactForm,
											email: e.target.value
										}),
										className: "mt-1 w-full rounded-xl border border-border bg-charcoal px-3.5 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[11px] uppercase tracking-wider text-muted-foreground font-medium",
										children: "Physical Kitchen Address"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 2,
										value: contactForm.address,
										onChange: (e) => setContactForm({
											...contactForm,
											address: e.target.value
										}),
										className: "mt-1 w-full rounded-xl border border-border bg-charcoal px-3.5 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pt-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "submit",
											disabled: saveSetting.isPending,
											className: "inline-flex items-center gap-2 rounded-full bg-gold px-7 py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save Contact Details"]
										})
									})
								]
							})
						})]
					}),
					tab === "gallery" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-serif",
								children: "Gallery Management"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-0.5",
								children: "Add and manage food and kitchen photos shown on the website gallery."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "luxe-card p-5 max-w-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-semibold mb-3",
									children: "Add New Photo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: async (e) => {
										e.preventDefault();
										if (!newGalleryUrl.trim()) return;
										await createGallery.mutateAsync({
											image_url: newGalleryUrl.trim(),
											caption: newGalleryCaption.trim()
										});
										setNewGalleryUrl("");
										setNewGalleryCaption("");
										toast.success("Photo added to gallery");
									},
									className: "space-y-3 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "url",
											required: true,
											placeholder: "Image URL (https://...)",
											value: newGalleryUrl,
											onChange: (e) => setNewGalleryUrl(e.target.value),
											className: "w-full rounded-xl border border-border bg-charcoal px-3.5 py-2 text-xs text-foreground focus:border-gold focus:outline-none"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "Caption (e.g. Gajar halwa slow-cooked in pure ghee)",
											value: newGalleryCaption,
											onChange: (e) => setNewGalleryCaption(e.target.value),
											className: "w-full rounded-xl border border-border bg-charcoal px-3.5 py-2 text-xs text-foreground focus:border-gold focus:outline-none"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											className: "rounded-full bg-gold px-5 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90",
											children: "Add Photo"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4",
								children: gallery.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "luxe-card p-2 relative group overflow-hidden",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: g.image_url,
											alt: g.caption,
											className: "aspect-square w-full rounded-xl object-cover"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-[11px] text-muted-foreground px-1 truncate",
											children: g.caption || "No caption"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => deleteGallery.mutate(g.id),
											className: "absolute top-3 right-3 rounded-full bg-background/80 p-1.5 text-destructive hover:bg-background",
											title: "Delete Photo",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
										})
									]
								}, g.id))
							})
						]
					}),
					tab === "testimonials" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-serif",
								children: "Customer Testimonials"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-0.5",
								children: "Manage real customer reviews and testimonials displayed on the homepage."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "luxe-card p-5 max-w-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-semibold mb-3",
									children: "Add Customer Review"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: async (e) => {
										e.preventDefault();
										if (!newTestimonial.name || !newTestimonial.message) return;
										await createTestimonial.mutateAsync(newTestimonial);
										setNewTestimonial({
											name: "",
											location: "Malda",
											message: ""
										});
										toast.success("Review added");
									},
									className: "space-y-3 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-2 gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												required: true,
												placeholder: "Customer Name",
												value: newTestimonial.name,
												onChange: (e) => setNewTestimonial({
													...newTestimonial,
													name: e.target.value
												}),
												className: "rounded-xl border border-border bg-charcoal px-3 py-2 text-xs text-foreground focus:border-gold focus:outline-none"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												placeholder: "Location (e.g. English Bazar, Malda)",
												value: newTestimonial.location,
												onChange: (e) => setNewTestimonial({
													...newTestimonial,
													location: e.target.value
												}),
												className: "rounded-xl border border-border bg-charcoal px-3 py-2 text-xs text-foreground focus:border-gold focus:outline-none"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											rows: 2,
											required: true,
											placeholder: "Customer review or feedback...",
											value: newTestimonial.message,
											onChange: (e) => setNewTestimonial({
												...newTestimonial,
												message: e.target.value
											}),
											className: "w-full rounded-xl border border-border bg-charcoal px-3 py-2 text-xs text-foreground focus:border-gold focus:outline-none"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											className: "rounded-full bg-gold px-5 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90",
											children: "Add Testimonial"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
								children: testimonials.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "luxe-card p-4 flex flex-col justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-foreground/90 italic",
										children: [
											"“",
											t.message,
											"”"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-3 text-xs font-semibold text-gold",
										children: [
											t.name,
											" ",
											t.location ? `• ${t.location}` : ""
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-4 pt-2 border-t border-border flex justify-end",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => deleteTestimonial.mutate(t.id),
											className: "text-xs text-muted-foreground hover:text-destructive flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" }), " Remove"]
										})
									})]
								}, t.id))
							})
						]
					})
				]
			})]
		})]
	});
}
//#endregion
export { AdminDashboardPage as component };
