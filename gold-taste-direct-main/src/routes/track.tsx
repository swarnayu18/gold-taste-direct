import { createFileRoute, useSearch } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  CookingPot,
  MessageCircle,
  Package,
  Search,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { PageHeader, SiteLayout } from "@/components/site/SiteLayout";
import {
  BRAND,
  formatINR,
  ORDER_STATUS_LABELS,
  PAYMENT_STATUS_LABELS,
  whatsappLink,
} from "@/lib/brand";
import { trackOrder, type TrackedOrder, zoneLabel } from "@/lib/shop";

export const Route = createFileRoute("/track")({
  validateSearch: (search: Record<string, unknown>) => ({
    order: typeof search.order === "string" ? search.order : undefined,
    mobile: typeof search.mobile === "string" ? search.mobile : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Track Order | Gold Taste Malda" },
      { name: "description", content: "Track your fresh halwa preparation and delivery status in Malda." },
      { property: "og:title", content: "Track Order | Gold Taste Malda" },
    ],
  }),
  component: TrackOrderPage,
});

const TIMELINE_STEPS = [
  { key: "pending", label: "Payment Pending", icon: Clock, desc: "Awaiting UPI payment" },
  { key: "payment_verification", label: "Payment Verification", icon: Clock, desc: "Owner matching UPI payment" },
  { key: "confirmed", label: "Confirmed", icon: CheckCircle2, desc: "Payment verified & order accepted" },
  { key: "preparing", label: "Preparing", icon: CookingPot, desc: "Slow-cooking fresh halwa" },
  { key: "ready", label: "Ready for Dispatch", icon: Package, desc: "Boxed and sealed with care" },
  { key: "dispatched", label: "Out for Delivery", icon: Truck, desc: "With local delivery partner" },
  { key: "delivered", label: "Delivered", icon: CheckCircle2, desc: "Delivered to your doorstep" },
];

function TrackOrderPage() {
  const search = useSearch({ from: "/track" });
  const [orderCode, setOrderCode] = useState(search.order || "");
  const [mobile, setMobile] = useState(search.mobile || "");

  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [searched, setSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
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
        setErrorMsg(
          "No order found matching this Order ID and Mobile number. Please verify the information and try again.",
        );
      } else {
        setOrder(data);
      }
    } catch (err) {
      console.error("Tracking lookup error:", err);
      setErrorMsg("Unable to retrieve order status right now. Please check your connection or contact us on WhatsApp.");
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search.order && search.mobile) {
      handleSearch();
    }
  }, [search.order, search.mobile]);

  const currentStepIndex = order
    ? TIMELINE_STEPS.findIndex((s) => s.key === order.order_status)
    : -1;

  const isCancelled = order?.order_status === "cancelled";

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Order Tracking"
        title="Track Your Halwa"
        subtitle="Follow your freshly prepared halwa from our kitchen to your doorstep."
      />

      <section className="mx-auto max-w-4xl px-4 py-10">
        {/* Lookup form */}
        <div className="luxe-card p-6 md:p-8">
          <form onSubmit={handleSearch} className="grid gap-4 sm:grid-cols-[1.5fr_1.5fr_auto]">
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground font-medium">
                Order ID
              </label>
              <input
                type="text"
                required
                placeholder="e.g. GT-20260921-001"
                value={orderCode}
                onChange={(e) => setOrderCode(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground font-medium">
                Mobile Number
              </label>
              <input
                type="tel"
                required
                maxLength={10}
                placeholder="10-digit mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                className="mt-1.5 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gold px-7 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {loading ? (
                  "Searching..."
                ) : (
                  <>
                    <Search className="h-4 w-4" /> Track
                  </>
                )}
              </button>
            </div>
          </form>

          {errorMsg && (
            <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 p-3.5 text-xs text-destructive flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Tracking Details Result */}
        {order && (
          <div className="mt-8 luxe-card overflow-hidden">
            {/* Header info */}
            <div className="border-b border-border bg-charcoal p-6 md:p-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold font-medium">
                  Order Details
                </span>
                <h2 className="text-2xl font-serif text-foreground mt-1">
                  {order.order_code}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Ordered on {new Date(order.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 text-xs font-semibold text-gold">
                  {ORDER_STATUS_LABELS[order.order_status] ?? order.order_status}
                </span>
                <span className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                  Payment: {PAYMENT_STATUS_LABELS[order.payment_status] ?? order.payment_status}
                </span>
              </div>
            </div>

            {/* Cancelled banner or Timeline */}
            <div className="p-6 md:p-8">
              {isCancelled ? (
                <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-6 text-center text-destructive">
                  <AlertCircle className="h-8 w-8 mx-auto" />
                  <h3 className="text-lg font-semibold mt-2">This order has been cancelled</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Please contact Gold Taste on WhatsApp if you have any questions regarding refunds.
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-gold mb-6">
                    Preparation & Delivery Timeline
                  </h3>

                  <div className="relative space-y-6 md:space-y-0 md:grid md:grid-cols-7 md:gap-2">
                    {TIMELINE_STEPS.map((step, idx) => {
                      const isPast = currentStepIndex > idx;
                      const isCurrent = currentStepIndex === idx;
                      const isUpcoming = currentStepIndex < idx;

                      const StepIcon = step.icon;

                      return (
                        <div key={step.key} className="relative flex md:flex-col items-start md:items-center text-left md:text-center gap-3 md:gap-2">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all ${
                              isPast
                                ? "border-gold bg-gold text-primary-foreground"
                                : isCurrent
                                  ? "border-gold bg-gold/20 text-gold shadow-gold ring-4 ring-gold/10"
                                  : "border-border bg-card text-muted-foreground"
                            }`}
                          >
                            <StepIcon className="h-5 w-5" />
                          </div>

                          <div className="min-w-0">
                            <p
                              className={`text-xs font-semibold ${
                                isCurrent ? "text-gold" : isPast ? "text-foreground" : "text-muted-foreground"
                              }`}
                            >
                              {step.label}
                            </p>
                            <p className="text-[11px] text-muted-foreground hidden sm:block">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Order items list */}
              <div className="mt-10 border-t border-border pt-6">
                <h3 className="text-xs uppercase tracking-widest text-gold mb-4">
                  Items in this order
                </h3>
                <div className="divide-y divide-border rounded-2xl border border-border bg-charcoal">
                  {(order.items ?? []).map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3.5 text-sm">
                      <div>
                        <p className="font-medium text-foreground">{item.product_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.weight_label} × {item.quantity}
                        </p>
                      </div>
                      <span className="font-semibold text-gold">{formatINR(item.line_total)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap justify-between items-center text-xs text-muted-foreground px-2">
                  <span>Zone: {zoneLabel(order.delivery_zone)}</span>
                  <span>
                    Delivery Fee: {order.delivery_fee === 0 ? "Free" : formatINR(order.delivery_fee)}
                  </span>
                  <span className="text-base font-semibold text-gold">
                    Total: {formatINR(order.total)}
                  </span>
                </div>
              </div>

              {/* Support action */}
              <div className="mt-8 border-t border-border pt-6 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">
                  Need faster updates or special instructions?
                </p>
                <a
                  href={whatsappLink(
                    `Hello Gold Taste, I would like an update on order ${order.order_code}.`,
                    BRAND.whatsapp,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gold px-5 py-2 text-xs font-semibold text-gold hover:bg-gold/10 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" /> Message Kitchen on WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
