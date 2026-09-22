import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Clock,
  CookingPot,
  DollarSign,
  Edit,
  Eye,
  Filter,
  Image as ImageIcon,
  LogOut,
  MessageCircle,
  Package,
  Plus,
  QrCode,
  RefreshCw,
  Save,
  Search,
  Settings,
  ShoppingBag,
  Trash2,
  Truck,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { BRAND, formatINR, logoImage, ORDER_STATUS_LABELS, PAYMENT_STATUS_LABELS, whatsappLink } from "@/lib/brand";
import {
  type AdminOrder,
  useAdminOrders,
  useCreateGalleryItem,
  useCreateProduct,
  useCreateTestimonial,
  useDeleteGalleryItem,
  useDeleteProduct,
  useDeleteTestimonial,
  useGallery,
  useProducts,
  useSaveSetting,
  useSettings,
  useTestimonials,
  useUpdateOrder,
  useUpdateProduct,
  zoneLabel,
} from "@/lib/shop";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/lib/types";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | Gold Taste Malda" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboardPage,
});

type TabType = "overview" | "orders" | "products" | "upi" | "delivery" | "contact" | "gallery" | "testimonials";

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabType>("overview");
  const [authChecked, setAuthChecked] = useState(false);

  // Data queries
  const { data: orders = [], isLoading: ordersLoading, refetch: refetchOrders } = useAdminOrders();
  const { data: products = [], isLoading: productsLoading } = useProducts(true);
  const { data: settings, isLoading: settingsLoading } = useSettings();
  const { data: gallery = [] } = useGallery(true);
  const { data: testimonials = [] } = useTestimonials(true);

  // Mutations
  const updateOrder = useUpdateOrder();
  const saveSetting = useSaveSetting();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const createGallery = useCreateGalleryItem();
  const deleteGallery = useDeleteGalleryItem();
  const createTestimonial = useCreateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();

  // Authentication validation
  useEffect(() => {
    const isPreview = sessionStorage.getItem("goldtaste_admin_preview") === "true";
    if (isPreview) {
      setAuthChecked(true);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate({ to: "/admin/login" });
      } else {
        setAuthChecked(true);
      }
    });
  }, [navigate]);

  const handleSignOut = async () => {
    sessionStorage.removeItem("goldtaste_admin_preview");
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate({ to: "/admin/login" });
  };

  /* ------------------------------- State for Orders ------------------------------- */
  const [orderFilter, setOrderFilter] = useState<string>("all");
  const [orderSearch, setOrderSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchStatus = orderFilter === "all" || o.order_status === orderFilter;
      const q = orderSearch.toLowerCase().trim();
      const matchSearch =
        !q ||
        o.order_code.toLowerCase().includes(q) ||
        o.customer_name.toLowerCase().includes(q) ||
        o.mobile.includes(q);
      return matchStatus && matchSearch;
    });
  }, [orders, orderFilter, orderSearch]);

  /* ------------------------------ Metrics Calculations ----------------------------- */
  const metrics = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const todayOrders = orders.filter((o) => o.created_at.startsWith(today));
    const pendingVerification = orders.filter(
      (o) => o.order_status === "payment_verification" || o.payment_status === "paid_by_customer",
    );
    const inPrep = orders.filter((o) => o.order_status === "preparing");
    const delivered = orders.filter((o) => o.order_status === "delivered");
    const totalRev = orders
      .filter((o) => o.payment_status === "verified" || o.order_status === "delivered")
      .reduce((sum, o) => sum + Number(o.total || 0), 0);

    return {
      todayCount: todayOrders.length,
      pendingVerificationCount: pendingVerification.length,
      inPrepCount: inPrep.length,
      deliveredCount: delivered.length,
      totalRevenue: totalRev,
      totalOrders: orders.length,
    };
  }, [orders]);

  /* ------------------------------ Product Modal State ------------------------------ */
  const [productModal, setProductModal] = useState<{
    open: boolean;
    mode: "create" | "edit";
    data?: Partial<Product>;
  }>({ open: false, mode: "create" });

  const [productForm, setProductForm] = useState({
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
    p1kg: 540,
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
      p1kg: 540,
    });
    setProductModal({ open: true, mode: "create" });
  };

  const openEditProductModal = (p: Product) => {
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
      p1kg: Number(v1kg),
    });
    setProductModal({ open: true, mode: "edit", data: p });
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim()) {
      toast.error("Please provide a product name");
      return;
    }

    const slug =
      productForm.slug.trim() ||
      productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    try {
      if (productModal.mode === "create") {
        await createProduct.mutateAsync({
          name: productForm.name,
          slug,
          short_description: productForm.short_description,
          description: productForm.description,
          ingredients: productForm.ingredients,
          image_url: productForm.image_url || undefined,
          is_active: productForm.is_active,
          is_featured: productForm.is_featured,
          in_stock: productForm.in_stock,
          price_is_placeholder: productForm.price_is_placeholder,
          variants: [
            { weight_label: "250g", price: productForm.p250, sort_order: 1 },
            { weight_label: "500g", price: productForm.p500, sort_order: 2 },
            { weight_label: "1kg", price: productForm.p1kg, sort_order: 3 },
          ],
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
            { id: v250?.id, weight_label: "250g", price: productForm.p250, sort_order: 1 },
            { id: v500?.id, weight_label: "500g", price: productForm.p500, sort_order: 2 },
            { id: v1kg?.id, weight_label: "1kg", price: productForm.p1kg, sort_order: 3 },
          ],
        });
        toast.success("Product updated successfully");
      }
      setProductModal({ open: false, mode: "create" });
    } catch (err: unknown) {
      console.error("Save product error:", err);
      toast.error(err instanceof Error ? err.message : "Failed to save product");
    }
  };

  /* ------------------------------ Settings Form States ------------------------------ */
  const [upiForm, setUpiForm] = useState({
    upi_id: "YOUR-UPI-ID@upi",
    merchant_name: "Gold Taste",
    qr_image_url: "",
    is_placeholder: true,
  });

  const [deliveryForm, setDeliveryForm] = useState({
    malda_fee: 0,
    outside_fee: 40,
    malda_eta: "1–2 days",
    outside_eta: "2–3 days",
    minimum_order: 0,
  });

  const [contactForm, setContactForm] = useState({
    phone: BRAND.phone,
    whatsapp: BRAND.whatsapp,
    email: BRAND.email,
    address: BRAND.address,
    maps_embed_url: "",
  });

  useEffect(() => {
    if (settings) {
      if (settings.upi) setUpiForm(settings.upi);
      if (settings.delivery) setDeliveryForm(settings.delivery);
      if (settings.contact) setContactForm(settings.contact);
    }
  }, [settings]);

  /* ------------------------------ Gallery & Testimonials State --------------------- */
  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const [newGalleryCaption, setNewGalleryCaption] = useState("");
  const [newTestimonial, setNewTestimonial] = useState({ name: "", location: "Malda", message: "" });

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold border-t-transparent mx-auto" />
          <p className="mt-4 text-xs text-muted-foreground">Checking credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Admin Top Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-charcoal/95 backdrop-blur px-4 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Logo" className="h-9 w-auto" />
            <div>
              <span className="font-serif text-lg text-gold font-semibold">Gold Taste Admin</span>
              <span className="ml-2 rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 text-[10px] text-gold font-mono uppercase">
                Owner Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold transition-colors"
            >
              <Eye className="h-3.5 w-3.5" /> View Storefront
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Layout */}
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 md:py-8 flex flex-col md:flex-row gap-6">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-56 shrink-0 space-y-1">
          {[
            { id: "overview", label: "Overview", icon: Building2 },
            { id: "orders", label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: "products", label: `Products (${products.length})`, icon: Package },
            { id: "upi", label: "UPI & QR", icon: QrCode },
            { id: "delivery", label: "Delivery Charges", icon: Truck },
            { id: "contact", label: "Store Contact", icon: Settings },
            { id: "gallery", label: "Gallery Photos", icon: ImageIcon },
            { id: "testimonials", label: "Testimonials", icon: Users },
          ].map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id as TabType)}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all ${
                  active
                    ? "bg-gold text-primary-foreground font-semibold shadow-gold"
                    : "text-muted-foreground hover:bg-card hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </aside>

        {/* Tab Body */}
        <main className="flex-1 min-w-0">
          {/* -------------------- 1. OVERVIEW TAB -------------------- */}
          {tab === "overview" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-serif">Kitchen Dashboard</h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Real-time status of halwa orders, revenue and preparation.
                </p>
              </div>

              {/* Statistics Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="luxe-card p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      Today's Orders
                    </span>
                    <Clock className="h-4 w-4 text-gold" />
                  </div>
                  <p className="mt-3 text-3xl font-serif text-foreground">{metrics.todayCount}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">Placed today</p>
                </div>

                <div className="luxe-card p-5 border-gold/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-gold">
                      Payment Verification
                    </span>
                    <AlertCircle className="h-4 w-4 text-gold" />
                  </div>
                  <p className="mt-3 text-3xl font-serif text-gold">
                    {metrics.pendingVerificationCount}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">Needs UPI confirmation</p>
                </div>

                <div className="luxe-card p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      In Preparation
                    </span>
                    <CookingPot className="h-4 w-4 text-gold" />
                  </div>
                  <p className="mt-3 text-3xl font-serif text-foreground">{metrics.inPrepCount}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">Currently cooking</p>
                </div>

                <div className="luxe-card p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      Total Revenue
                    </span>
                    <DollarSign className="h-4 w-4 text-gold" />
                  </div>
                  <p className="mt-3 text-2xl font-serif text-gold">
                    {formatINR(metrics.totalRevenue)}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    From {metrics.totalOrders} total orders
                  </p>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="luxe-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-serif">Recent Orders</h2>
                  <button
                    type="button"
                    onClick={() => setTab("orders")}
                    className="text-xs text-gold hover:underline"
                  >
                    View All Orders →
                  </button>
                </div>

                {orders.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-6 text-center">
                    No orders have been received yet. Test by placing one from the storefront!
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-border text-muted-foreground uppercase text-[10px]">
                        <tr>
                          <th className="py-2.5">Order ID</th>
                          <th className="py-2.5">Customer</th>
                          <th className="py-2.5">Zone</th>
                          <th className="py-2.5">Total</th>
                          <th className="py-2.5">Status</th>
                          <th className="py-2.5">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {orders.slice(0, 5).map((o) => (
                          <tr key={o.id} className="hover:bg-charcoal/50">
                            <td className="py-3 font-mono font-medium text-foreground">
                              {o.order_code}
                            </td>
                            <td className="py-3">
                              <p className="font-medium">{o.customer_name}</p>
                              <p className="text-[11px] text-muted-foreground">{o.mobile}</p>
                            </td>
                            <td className="py-3 text-muted-foreground">{zoneLabel(o.delivery_zone as never)}</td>
                            <td className="py-3 font-semibold text-gold">{formatINR(o.total)}</td>
                            <td className="py-3">
                              <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[10px] text-gold font-medium">
                                {ORDER_STATUS_LABELS[o.order_status] ?? o.order_status}
                              </span>
                            </td>
                            <td className="py-3">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedOrder(o);
                                  setTab("orders");
                                }}
                                className="text-gold hover:underline"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* -------------------- 2. ORDERS TAB -------------------- */}
          {tab === "orders" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-serif">Orders Management</h1>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Verify customer payments, track kitchen status and update orders.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => refetchOrders()}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground hover:text-gold hover:border-gold"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Refresh
                </button>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by Order ID, name or phone..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full rounded-xl border border-border bg-charcoal pl-10 pr-4 py-2 text-xs text-foreground focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                  {[
                    { id: "all", label: "All" },
                    { id: "payment_verification", label: "Pending Verification" },
                    { id: "confirmed", label: "Confirmed" },
                    { id: "preparing", label: "Preparing" },
                    { id: "ready", label: "Ready" },
                    { id: "dispatched", label: "Out for Delivery" },
                    { id: "delivered", label: "Delivered" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setOrderFilter(f.id)}
                      className={`rounded-full px-3 py-1 text-[11px] font-medium whitespace-nowrap transition-colors ${
                        orderFilter === f.id
                          ? "bg-gold text-primary-foreground font-semibold"
                          : "border border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders Table */}
              <div className="luxe-card overflow-hidden">
                {filteredOrders.length === 0 ? (
                  <p className="text-center text-xs text-muted-foreground py-12">
                    No orders match the current filter or search query.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-border bg-charcoal text-muted-foreground uppercase text-[10px]">
                        <tr>
                          <th className="p-3.5">Order</th>
                          <th className="p-3.5">Customer</th>
                          <th className="p-3.5">Items</th>
                          <th className="p-3.5">Total</th>
                          <th className="p-3.5">Payment</th>
                          <th className="p-3.5">Order Status</th>
                          <th className="p-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filteredOrders.map((o) => (
                          <tr key={o.id} className="hover:bg-charcoal/40 transition-colors">
                            <td className="p-3.5">
                              <span className="font-mono font-bold text-foreground">
                                {o.order_code}
                              </span>
                              <p className="text-[10px] text-muted-foreground mt-0.5">
                                {new Date(o.created_at).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </td>

                            <td className="p-3.5">
                              <p className="font-medium text-foreground">{o.customer_name}</p>
                              <p className="text-muted-foreground">{o.mobile}</p>
                              <p className="text-[10px] text-muted-foreground">
                                {zoneLabel(o.delivery_zone as never)}
                              </p>
                            </td>

                            <td className="p-3.5">
                              <div className="space-y-0.5 max-w-[200px]">
                                {(o.order_items ?? []).map((it, idx) => (
                                  <p key={idx} className="truncate text-muted-foreground">
                                    {it.product_name} ({it.weight_label}) × {it.quantity}
                                  </p>
                                ))}
                              </div>
                            </td>

                            <td className="p-3.5 font-bold text-gold">{formatINR(o.total)}</td>

                            <td className="p-3.5">
                              <select
                                value={o.payment_status}
                                onChange={(e) =>
                                  updateOrder.mutate({ id: o.id, payment_status: e.target.value })
                                }
                                className="rounded-lg border border-border bg-charcoal px-2 py-1 text-[11px] text-foreground focus:border-gold focus:outline-none"
                              >
                                <option value="pending">Pending</option>
                                <option value="paid_by_customer">Paid by Customer</option>
                                <option value="verified">Verified ✅</option>
                                <option value="rejected">Rejected ❌</option>
                              </select>
                            </td>

                            <td className="p-3.5">
                              <select
                                value={o.order_status}
                                onChange={(e) =>
                                  updateOrder.mutate({ id: o.id, order_status: e.target.value })
                                }
                                className="rounded-lg border border-border bg-charcoal px-2 py-1 text-[11px] text-foreground focus:border-gold focus:outline-none"
                              >
                                <option value="pending">Payment Pending</option>
                                <option value="payment_verification">Payment Verification</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="preparing">Preparing</option>
                                <option value="ready">Ready for Dispatch</option>
                                <option value="dispatched">Out for Delivery</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>

                            <td className="p-3.5 text-right space-x-2">
                              <a
                                href={whatsappLink(
                                  `Hello ${o.customer_name}, regarding your Gold Taste order ${o.order_code}: status is now ${ORDER_STATUS_LABELS[o.order_status] || o.order_status}.`,
                                  o.whatsapp || o.mobile,
                                )}
                                target="_blank"
                                rel="noreferrer"
                                title="Open WhatsApp chat with customer"
                                className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-[11px] text-gold hover:bg-gold/20"
                              >
                                <MessageCircle className="h-3 w-3" /> WhatsApp
                              </a>
                              <button
                                type="button"
                                onClick={() => setSelectedOrder(o)}
                                className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground"
                              >
                                Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Order Detail Modal */}
              {selectedOrder && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
                  onClick={() => setSelectedOrder(null)}
                >
                  <div
                    className="relative max-w-2xl w-full rounded-2xl border border-gold/40 bg-card p-6 shadow-luxe max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-start justify-between border-b border-border pb-4">
                      <div>
                        <span className="text-xs uppercase tracking-widest text-gold font-medium">
                          Order Details
                        </span>
                        <h2 className="text-2xl font-serif mt-1">{selectedOrder.order_code}</h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(null)}
                        className="rounded-full border border-border p-1.5 text-muted-foreground hover:text-foreground"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="mt-4 space-y-4 text-xs">
                      <div className="grid gap-3 sm:grid-cols-2 rounded-xl border border-border bg-charcoal p-3.5">
                        <div>
                          <p className="text-muted-foreground uppercase text-[10px]">Customer</p>
                          <p className="font-semibold text-sm mt-0.5 text-foreground">
                            {selectedOrder.customer_name}
                          </p>
                          <p className="text-muted-foreground mt-0.5">Mobile: {selectedOrder.mobile}</p>
                          <p className="text-muted-foreground">
                            WhatsApp: {selectedOrder.whatsapp || selectedOrder.mobile}
                          </p>
                          {selectedOrder.email && (
                            <p className="text-muted-foreground">Email: {selectedOrder.email}</p>
                          )}
                        </div>

                        <div>
                          <p className="text-muted-foreground uppercase text-[10px]">Delivery Address</p>
                          <p className="font-medium text-foreground mt-0.5">
                            {selectedOrder.address}, {selectedOrder.area}
                          </p>
                          <p className="text-muted-foreground">
                            {selectedOrder.city}, {selectedOrder.state} - {selectedOrder.pincode}
                          </p>
                          <p className="text-gold font-medium mt-1">
                            Zone: {zoneLabel(selectedOrder.delivery_zone as never)}
                          </p>
                        </div>
                      </div>

                      {/* Items */}
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                          Ordered Items
                        </p>
                        <div className="divide-y divide-border rounded-xl border border-border bg-charcoal">
                          {(selectedOrder.order_items ?? []).map((it, idx) => (
                            <div key={idx} className="flex justify-between p-3">
                              <div>
                                <p className="font-medium text-foreground">{it.product_name}</p>
                                <p className="text-muted-foreground">
                                  {it.weight_label} × {it.quantity} (@ {formatINR(it.unit_price)})
                                </p>
                              </div>
                              <span className="font-semibold text-gold">
                                {formatINR(it.line_total)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Totals */}
                      <div className="rounded-xl border border-border bg-charcoal p-3 space-y-1.5">
                        <div className="flex justify-between text-muted-foreground">
                          <span>Subtotal</span>
                          <span>{formatINR(selectedOrder.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Delivery Fee</span>
                          <span>{formatINR(selectedOrder.delivery_fee)}</span>
                        </div>
                        <div className="hairline-gold my-1" />
                        <div className="flex justify-between font-bold text-sm">
                          <span>Grand Total</span>
                          <span className="text-gold">{formatINR(selectedOrder.total)}</span>
                        </div>
                      </div>

                      {/* Admin Notes */}
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                          Admin Kitchen Notes
                        </p>
                        <textarea
                          rows={2}
                          defaultValue={selectedOrder.admin_notes || ""}
                          placeholder="e.g. Extra dry fruits requested, customer paid via GPay txn #..."
                          onBlur={(e) =>
                            updateOrder.mutate({
                              id: selectedOrder.id,
                              admin_notes: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-border bg-charcoal p-2.5 text-xs text-foreground focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* -------------------- 3. PRODUCTS TAB -------------------- */}
          {tab === "products" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-serif">Halwa Catalog</h1>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Configure names, descriptions, weight variants, pricing, and stock status.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openNewProductModal}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  <Plus className="h-4 w-4" /> Add Halwa
                </button>
              </div>

              {/* Product List Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((p) => {
                  const variants = p.product_variants ?? [];
                  const minPrice = variants[0]?.price ?? 0;
                  const maxPrice = variants[variants.length - 1]?.price ?? minPrice;

                  return (
                    <div key={p.id} className="luxe-card p-5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-serif text-lg font-medium">{p.name}</h3>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              p.in_stock
                                ? "bg-success/15 text-success border border-success/30"
                                : "bg-destructive/15 text-destructive border border-destructive/30"
                            }`}
                          >
                            {p.in_stock ? "In Stock" : "Out of Stock"}
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                          {p.short_description || p.description}
                        </p>

                        {/* Variant pricing chips */}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {variants.map((v) => (
                            <span
                              key={v.id}
                              className="rounded-lg border border-border bg-charcoal px-2 py-1 text-[11px]"
                            >
                              {v.weight_label}:{" "}
                              <strong className="text-gold">{formatINR(Number(v.price))}</strong>
                            </span>
                          ))}
                        </div>

                        {p.price_is_placeholder && (
                          <p className="mt-2 text-[10px] text-gold">Placeholder price</p>
                        )}
                      </div>

                      {/* Controls */}
                      <div className="mt-5 border-t border-border pt-4 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() =>
                            updateProduct.mutate({
                              id: p.id,
                              in_stock: !p.in_stock,
                            })
                          }
                          className="text-xs text-muted-foreground hover:text-gold"
                        >
                          Toggle {p.in_stock ? "Out of Stock" : "In Stock"}
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => openEditProductModal(p)}
                            className="rounded-full border border-border p-1.5 text-muted-foreground hover:text-gold hover:border-gold"
                            title="Edit Halwa"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                                deleteProduct.mutate(p.id);
                              }
                            }}
                            className="rounded-full border border-border p-1.5 text-muted-foreground hover:text-destructive hover:border-destructive"
                            title="Delete Halwa"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Create/Edit Product Dialog */}
              {productModal.open && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
                  onClick={() => setProductModal({ open: false, mode: "create" })}
                >
                  <div
                    className="relative max-w-xl w-full rounded-2xl border border-gold/40 bg-card p-6 shadow-luxe max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h2 className="text-xl font-serif mb-4">
                      {productModal.mode === "create" ? "Add New Halwa" : "Edit Halwa Details"}
                    </h2>

                    <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                          Product Name
                        </label>
                        <input
                          type="text"
                          required
                          value={productForm.name}
                          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                          className="mt-1 w-full rounded-xl border border-border bg-charcoal px-3 py-2 text-sm text-foreground focus:border-gold focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                          Short Description
                        </label>
                        <input
                          type="text"
                          value={productForm.short_description}
                          onChange={(e) =>
                            setProductForm({ ...productForm, short_description: e.target.value })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-charcoal px-3 py-2 text-xs text-foreground focus:border-gold focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                          Detailed Description
                        </label>
                        <textarea
                          rows={2}
                          value={productForm.description}
                          onChange={(e) =>
                            setProductForm({ ...productForm, description: e.target.value })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-charcoal px-3 py-2 text-xs text-foreground focus:border-gold focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                          Ingredients
                        </label>
                        <input
                          type="text"
                          value={productForm.ingredients}
                          onChange={(e) =>
                            setProductForm({ ...productForm, ingredients: e.target.value })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-charcoal px-3 py-2 text-xs text-foreground focus:border-gold focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                          Image URL (Optional)
                        </label>
                        <input
                          type="url"
                          placeholder="https://..."
                          value={productForm.image_url}
                          onChange={(e) =>
                            setProductForm({ ...productForm, image_url: e.target.value })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-charcoal px-3 py-2 text-xs text-foreground focus:border-gold focus:outline-none"
                        />
                      </div>

                      {/* Weight Variant Prices */}
                      <div className="border-t border-border pt-4">
                        <p className="text-[11px] uppercase tracking-wider text-gold font-medium mb-3">
                          Weight Variant Prices (₹ INR)
                        </p>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[10px] text-muted-foreground">250g Price</label>
                            <input
                              type="number"
                              min={0}
                              value={productForm.p250}
                              onChange={(e) =>
                                setProductForm({ ...productForm, p250: Number(e.target.value) })
                              }
                              className="mt-1 w-full rounded-xl border border-border bg-charcoal px-3 py-2 text-sm text-foreground focus:border-gold focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-muted-foreground">500g Price</label>
                            <input
                              type="number"
                              min={0}
                              value={productForm.p500}
                              onChange={(e) =>
                                setProductForm({ ...productForm, p500: Number(e.target.value) })
                              }
                              className="mt-1 w-full rounded-xl border border-border bg-charcoal px-3 py-2 text-sm text-foreground focus:border-gold focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-muted-foreground">1kg Price</label>
                            <input
                              type="number"
                              min={0}
                              value={productForm.p1kg}
                              onChange={(e) =>
                                setProductForm({ ...productForm, p1kg: Number(e.target.value) })
                              }
                              className="mt-1 w-full rounded-xl border border-border bg-charcoal px-3 py-2 text-sm text-foreground focus:border-gold focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Toggles */}
                      <div className="flex flex-wrap gap-4 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={productForm.in_stock}
                            onChange={(e) =>
                              setProductForm({ ...productForm, in_stock: e.target.checked })
                            }
                            className="accent-gold h-4 w-4"
                          />
                          <span>In Stock</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={productForm.is_featured}
                            onChange={(e) =>
                              setProductForm({ ...productForm, is_featured: e.target.checked })
                            }
                            className="accent-gold h-4 w-4"
                          />
                          <span>Featured on Homepage</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={productForm.price_is_placeholder}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                price_is_placeholder: e.target.checked,
                              })
                            }
                            className="accent-gold h-4 w-4"
                          />
                          <span>Show Placeholder Label</span>
                        </label>
                      </div>

                      <div className="pt-4 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setProductModal({ open: false, mode: "create" })}
                          className="rounded-full border border-border px-5 py-2 text-xs text-muted-foreground"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-full bg-gold px-6 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
                        >
                          Save Halwa
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* -------------------- 4. UPI SETTINGS TAB -------------------- */}
          {tab === "upi" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-serif">UPI & Payment Settings</h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Set the UPI ID and QR code that customers will scan during checkout.
                </p>
              </div>

              <div className="luxe-card p-6 md:p-8 max-w-2xl space-y-6">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await saveSetting.mutateAsync({ key: "upi", value: upiForm });
                    toast.success("UPI settings saved successfully");
                  }}
                  className="space-y-4 text-xs"
                >
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                      UPI ID / VPA <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. goldtaste@okhdfcbank"
                      value={upiForm.upi_id}
                      onChange={(e) => setUpiForm({ ...upiForm, upi_id: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-border bg-charcoal px-3.5 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
                    />
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      This will be shown to customers and embedded into the payment link.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                      Merchant / Payee Name
                    </label>
                    <input
                      type="text"
                      required
                      value={upiForm.merchant_name}
                      onChange={(e) => setUpiForm({ ...upiForm, merchant_name: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-border bg-charcoal px-3.5 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                      Custom UPI QR Image URL (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://... (or leave empty to generate QR dynamically)"
                      value={upiForm.qr_image_url}
                      onChange={(e) => setUpiForm({ ...upiForm, qr_image_url: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-border bg-charcoal px-3.5 py-2.5 text-xs text-foreground focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={upiForm.is_placeholder}
                        onChange={(e) =>
                          setUpiForm({ ...upiForm, is_placeholder: e.target.checked })
                        }
                        className="accent-gold h-4 w-4"
                      />
                      <span>Mark as placeholder UPI ID (shows demo banner to customers)</span>
                    </label>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={saveSetting.isPending}
                      className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
                    >
                      <Save className="h-4 w-4" /> Save UPI Configuration
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* -------------------- 5. DELIVERY SETTINGS TAB -------------------- */}
          {tab === "delivery" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-serif">Delivery Settings</h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Adjust delivery fees, estimated delivery timelines and minimum order values.
                </p>
              </div>

              <div className="luxe-card p-6 md:p-8 max-w-2xl space-y-6">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await saveSetting.mutateAsync({ key: "delivery", value: deliveryForm });
                    toast.success("Delivery settings saved successfully");
                  }}
                  className="space-y-4 text-xs"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                        Malda Town Delivery Fee (₹)
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={deliveryForm.malda_fee}
                        onChange={(e) =>
                          setDeliveryForm({ ...deliveryForm, malda_fee: Number(e.target.value) })
                        }
                        className="mt-1 w-full rounded-xl border border-border bg-charcoal px-3.5 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
                      />
                      <p className="mt-1 text-[10px] text-muted-foreground">0 for free delivery</p>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                        Malda Town ETA
                      </label>
                      <input
                        type="text"
                        value={deliveryForm.malda_eta}
                        onChange={(e) =>
                          setDeliveryForm({ ...deliveryForm, malda_eta: e.target.value })
                        }
                        className="mt-1 w-full rounded-xl border border-border bg-charcoal px-3.5 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                        Outside Malda Delivery Fee (₹)
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={deliveryForm.outside_fee}
                        onChange={(e) =>
                          setDeliveryForm({ ...deliveryForm, outside_fee: Number(e.target.value) })
                        }
                        className="mt-1 w-full rounded-xl border border-border bg-charcoal px-3.5 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                        Outside Malda ETA
                      </label>
                      <input
                        type="text"
                        value={deliveryForm.outside_eta}
                        onChange={(e) =>
                          setDeliveryForm({ ...deliveryForm, outside_eta: e.target.value })
                        }
                        className="mt-1 w-full rounded-xl border border-border bg-charcoal px-3.5 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                      Minimum Order Amount (₹)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={deliveryForm.minimum_order}
                      onChange={(e) =>
                        setDeliveryForm({ ...deliveryForm, minimum_order: Number(e.target.value) })
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-charcoal px-3.5 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
                    />
                    <p className="mt-1 text-[10px] text-muted-foreground">0 for no minimum</p>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={saveSetting.isPending}
                      className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
                    >
                      <Save className="h-4 w-4" /> Save Delivery Settings
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* -------------------- 6. CONTACT SETTINGS TAB -------------------- */}
          {tab === "contact" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-serif">Store & Contact Settings</h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Update phone numbers, WhatsApp link recipient, address and email.
                </p>
              </div>

              <div className="luxe-card p-6 md:p-8 max-w-2xl space-y-6">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await saveSetting.mutateAsync({ key: "contact", value: contactForm });
                    toast.success("Contact settings saved successfully");
                  }}
                  className="space-y-4 text-xs"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-border bg-charcoal px-3.5 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                        WhatsApp Number (Order Notifications)
                      </label>
                      <input
                        type="text"
                        value={contactForm.whatsapp}
                        onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-border bg-charcoal px-3.5 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-border bg-charcoal px-3.5 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                      Physical Kitchen Address
                    </label>
                    <textarea
                      rows={2}
                      value={contactForm.address}
                      onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-border bg-charcoal px-3.5 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={saveSetting.isPending}
                      className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
                    >
                      <Save className="h-4 w-4" /> Save Contact Details
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* -------------------- 7. GALLERY TAB -------------------- */}
          {tab === "gallery" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-serif">Gallery Management</h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Add and manage food and kitchen photos shown on the website gallery.
                </p>
              </div>

              {/* Add Photo Form */}
              <div className="luxe-card p-5 max-w-xl">
                <h2 className="text-sm font-semibold mb-3">Add New Photo</h2>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!newGalleryUrl.trim()) return;
                    await createGallery.mutateAsync({
                      image_url: newGalleryUrl.trim(),
                      caption: newGalleryCaption.trim(),
                    });
                    setNewGalleryUrl("");
                    setNewGalleryCaption("");
                    toast.success("Photo added to gallery");
                  }}
                  className="space-y-3 text-xs"
                >
                  <input
                    type="url"
                    required
                    placeholder="Image URL (https://...)"
                    value={newGalleryUrl}
                    onChange={(e) => setNewGalleryUrl(e.target.value)}
                    className="w-full rounded-xl border border-border bg-charcoal px-3.5 py-2 text-xs text-foreground focus:border-gold focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Caption (e.g. Gajar halwa slow-cooked in pure ghee)"
                    value={newGalleryCaption}
                    onChange={(e) => setNewGalleryCaption(e.target.value)}
                    className="w-full rounded-xl border border-border bg-charcoal px-3.5 py-2 text-xs text-foreground focus:border-gold focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-gold px-5 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
                  >
                    Add Photo
                  </button>
                </form>
              </div>

              {/* Photos List */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {gallery.map((g) => (
                  <div key={g.id} className="luxe-card p-2 relative group overflow-hidden">
                    <img
                      src={g.image_url}
                      alt={g.caption}
                      className="aspect-square w-full rounded-xl object-cover"
                    />
                    <p className="mt-2 text-[11px] text-muted-foreground px-1 truncate">
                      {g.caption || "No caption"}
                    </p>
                    <button
                      type="button"
                      onClick={() => deleteGallery.mutate(g.id)}
                      className="absolute top-3 right-3 rounded-full bg-background/80 p-1.5 text-destructive hover:bg-background"
                      title="Delete Photo"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* -------------------- 8. TESTIMONIALS TAB -------------------- */}
          {tab === "testimonials" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-serif">Customer Testimonials</h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Manage real customer reviews and testimonials displayed on the homepage.
                </p>
              </div>

              {/* Add Review */}
              <div className="luxe-card p-5 max-w-xl">
                <h2 className="text-sm font-semibold mb-3">Add Customer Review</h2>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!newTestimonial.name || !newTestimonial.message) return;
                    await createTestimonial.mutateAsync(newTestimonial);
                    setNewTestimonial({ name: "", location: "Malda", message: "" });
                    toast.success("Review added");
                  }}
                  className="space-y-3 text-xs"
                >
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Customer Name"
                      value={newTestimonial.name}
                      onChange={(e) =>
                        setNewTestimonial({ ...newTestimonial, name: e.target.value })
                      }
                      className="rounded-xl border border-border bg-charcoal px-3 py-2 text-xs text-foreground focus:border-gold focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Location (e.g. English Bazar, Malda)"
                      value={newTestimonial.location}
                      onChange={(e) =>
                        setNewTestimonial({ ...newTestimonial, location: e.target.value })
                      }
                      className="rounded-xl border border-border bg-charcoal px-3 py-2 text-xs text-foreground focus:border-gold focus:outline-none"
                    />
                  </div>
                  <textarea
                    rows={2}
                    required
                    placeholder="Customer review or feedback..."
                    value={newTestimonial.message}
                    onChange={(e) =>
                      setNewTestimonial({ ...newTestimonial, message: e.target.value })
                    }
                    className="w-full rounded-xl border border-border bg-charcoal px-3 py-2 text-xs text-foreground focus:border-gold focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-gold px-5 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
                  >
                    Add Testimonial
                  </button>
                </form>
              </div>

              {/* Testimonials List */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((t) => (
                  <div key={t.id} className="luxe-card p-4 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-foreground/90 italic">“{t.message}”</p>
                      <p className="mt-3 text-xs font-semibold text-gold">
                        {t.name} {t.location ? `• ${t.location}` : ""}
                      </p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-border flex justify-end">
                      <button
                        type="button"
                        onClick={() => deleteTestimonial.mutate(t.id)}
                        className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1"
                      >
                        <Trash2 className="h-3 w-3" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
