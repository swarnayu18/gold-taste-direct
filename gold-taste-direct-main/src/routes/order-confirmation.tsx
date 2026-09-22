import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { Check, CheckCircle2, Clock, Copy, Home, MessageCircle, Package, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader, SiteLayout } from "@/components/site/SiteLayout";
import { BRAND, formatINR, productImage, whatsappLink } from "@/lib/brand";
import { loadPlacedOrder } from "@/lib/order-draft";
import { etaFor, useSettings, zoneLabel } from "@/lib/shop";

export const Route = createFileRoute("/order-confirmation")({
  validateSearch: (search: Record<string, unknown>) => ({
    code: typeof search.code === "string" ? search.code : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Order Confirmed | Gold Taste Malda" },
      { name: "description", content: "Your Gold Taste halwa order has been submitted successfully." },
      { property: "og:title", content: "Order Confirmed | Gold Taste Malda" },
    ],
  }),
  component: OrderConfirmationPage,
});

function OrderConfirmationPage() {
  const search = useSearch({ from: "/order-confirmation" });
  const placed = loadPlacedOrder();
  const { data: settings } = useSettings();
  const [copied, setCopied] = useState(false);

  const orderCode = search.code || placed?.orderCode || "GT-ORDER";
  const mobile = placed?.details.mobile || "";

  const copyOrderCode = async () => {
    try {
      await navigator.clipboard.writeText(orderCode);
      setCopied(true);
      toast.success("Order ID copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.info(`Order ID: ${orderCode}`);
    }
  };

  const whatsappHelp = whatsappLink(
    `Hello Gold Taste, I would like to inquire about my order ID: ${orderCode}`,
    BRAND.whatsapp,
  );

  return (
    <SiteLayout>
      <PageHeader eyebrow="Confirmation" title="Order Submitted" />

      <section className="mx-auto max-w-3xl px-4 py-10">
        <div className="luxe-card overflow-hidden">
          {/* Hero Banner */}
          <div className="border-b border-border bg-charcoal/90 p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold border border-gold/40">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h1 className="mt-4 text-3xl font-serif text-foreground">
              Order Submitted Successfully 🎉
            </h1>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
              Your order details have been sent to Gold Taste on WhatsApp. Our kitchen will verify
              your payment and begin preparing your halwa shortly.
            </p>

            {/* Order Code Box */}
            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-gold/40 bg-background/80 px-5 py-2.5 shadow-gold">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground text-left">
                  Order Reference
                </p>
                <p className="font-mono text-base font-bold text-gold">{orderCode}</p>
              </div>
              <button
                type="button"
                onClick={copyOrderCode}
                className="rounded-full border border-border p-1.5 text-muted-foreground hover:text-gold hover:border-gold transition-colors"
                title="Copy Order ID"
              >
                {copied ? <Check className="h-4 w-4 text-gold" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            {/* Status explanation */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-charcoal p-4 flex items-start gap-3">
                <Clock className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold">Payment Verification</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Our team matches your UPI transaction against the reference details provided on
                    WhatsApp.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-charcoal p-4 flex items-start gap-3">
                <Truck className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold">Fresh Dispatch</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Estimated delivery:{" "}
                    <span className="text-gold font-medium">
                      {placed?.details.zone
                        ? etaFor(placed.details.zone, settings?.delivery)
                        : "1–2 days"}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Order details if available from memory */}
            {placed && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-gold mb-3">
                    Selected Halwa Boxes
                  </h3>
                  <div className="divide-y divide-border rounded-2xl border border-border bg-charcoal">
                    {placed.lines.map((item) => (
                      <div
                        key={`${item.slug}-${item.weightLabel}`}
                        className="flex items-center gap-3 p-3.5"
                      >
                        <img
                          src={productImage(item.slug, item.imageUrl)}
                          alt={item.name}
                          className="h-12 w-12 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.weightLabel} × {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gold">
                          {formatINR(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery address & totals */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-charcoal p-4">
                    <p className="text-xs uppercase tracking-widest text-gold">Delivery Address</p>
                    <p className="mt-2 text-sm font-semibold">{placed.details.fullName}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {placed.details.address}, {placed.details.area}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {placed.details.city}, {placed.details.state} - {placed.details.pincode}
                    </p>
                    <p className="mt-2 text-xs text-foreground/80">
                      Zone: {zoneLabel(placed.details.zone)}
                    </p>
                    <p className="text-xs text-muted-foreground">Mobile: {placed.details.mobile}</p>
                  </div>

                  <div className="rounded-2xl border border-border bg-charcoal p-4 space-y-2 text-sm">
                    <p className="text-xs uppercase tracking-widest text-gold mb-2">Payment Summary</p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="text-foreground">{formatINR(placed.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Delivery Fee</span>
                      <span className="text-foreground">
                        {placed.deliveryFee === 0 ? "Free" : formatINR(placed.deliveryFee)}
                      </span>
                    </div>
                    <div className="hairline-gold my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>Total Paid via UPI</span>
                      <span className="text-gold text-base">{formatINR(placed.total)}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground pt-1">
                      Status: Paid by customer (awaiting owner verification)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick action buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/track"
                search={
                  orderCode && mobile ? ({ order: orderCode, mobile } as never) : undefined
                }
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <Package className="h-4 w-4" /> Track Order Status
              </Link>

              <a
                href={whatsappHelp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gold px-7 py-3.5 text-sm font-semibold text-gold hover:bg-gold/10 transition-colors"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>

              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-gold/50 transition-colors"
              >
                <Home className="h-4 w-4" /> Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
