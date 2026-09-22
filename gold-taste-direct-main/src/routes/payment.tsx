import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, Copy, ExternalLink, QrCode, ShieldCheck, Smartphone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader, SiteLayout } from "@/components/site/SiteLayout";
import { formatINR, whatsappLink } from "@/lib/brand";
import { useCart } from "@/lib/cart";
import { clearDraft, loadDraft, savePlacedOrder } from "@/lib/order-draft";
import {
  buildOrderWhatsAppMessage,
  placeOrder,
  upiDeepLink,
  useSettings,
} from "@/lib/shop";

export const Route = createFileRoute("/payment")({
  head: () => ({
    meta: [
      { title: "UPI Payment | Gold Taste Malda" },
      { name: "description", content: "Scan and pay using any UPI app to complete your Gold Taste halwa order." },
      { property: "og:title", content: "UPI Payment | Gold Taste Malda" },
      { property: "og:description", content: "Scan and pay using any UPI app to complete your Gold Taste halwa order." },
    ],
  }),
  component: PaymentPage,
});

function PaymentPage() {
  const navigate = useNavigate();
  const { clear } = useCart();
  const { data: settings } = useSettings();
  const draft = loadDraft();

  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!draft || draft.lines.length === 0) {
    return (
      <SiteLayout>
        <PageHeader eyebrow="Payment" title="No Active Order" />
        <div className="mx-auto max-w-md px-4 py-16 text-center">
          <div className="luxe-card p-8">
            <p className="text-base text-foreground/90">
              There is no active order ready for payment.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Please choose your halwa and proceed through checkout first.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex rounded-full bg-gold px-7 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Browse Halwa
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  const upiId = settings?.upi?.upi_id || "YOUR-UPI-ID@upi";
  const merchantName = settings?.upi?.merchant_name || "Gold Taste";
  const isPlaceholder = settings?.upi?.is_placeholder ?? true;

  const upiUrl = upiDeepLink({
    upiId,
    merchantName,
    amount: draft.total,
    note: `Gold Taste Halwa Order`,
  });

  const qrImageUrl =
    settings?.upi?.qr_image_url && settings.upi.qr_image_url.trim().length > 0
      ? settings.upi.qr_image_url
      : `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(upiUrl)}&bgcolor=1f1e1c&color=eed48f`;

  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      toast.success("UPI ID copied to clipboard");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.info(`UPI ID: ${upiId}`);
    }
  };

  const handleConfirmOnWhatsApp = async () => {
    setSubmitting(true);
    try {
      // 1. Submit order to Supabase
      const { orderCode, createdAt } = await placeOrder(draft);

      // 2. Save placed order in local storage for order confirmation page
      savePlacedOrder({
        ...draft,
        orderCode,
        createdAt,
      });

      // 3. Clear cart & draft
      clear();
      clearDraft();

      // 4. Generate WhatsApp message and deep link
      const waMessage = buildOrderWhatsAppMessage({ orderCode, draft });
      const waUrl = whatsappLink(waMessage);

      // Open WhatsApp in new tab/app
      window.open(waUrl, "_blank", "noopener,noreferrer");

      // 5. Navigate to confirmation screen
      navigate({
        to: "/order-confirmation",
        search: { code: orderCode } as never,
      });
    } catch (err) {
      console.error("Order submission failed:", err);
      toast.error(
        "Could not automatically record order. You can still confirm directly via WhatsApp.",
      );
      // Fallback: open WhatsApp anyway with temporary GT code
      const fallbackCode = `GT-${Date.now().toString().slice(-6)}`;
      const waMessage = buildOrderWhatsAppMessage({ orderCode: fallbackCode, draft });
      window.open(whatsappLink(waMessage), "_blank", "noopener,noreferrer");
      savePlacedOrder({
        ...draft,
        orderCode: fallbackCode,
        createdAt: new Date().toISOString(),
      });
      clear();
      clearDraft();
      navigate({
        to: "/order-confirmation",
        search: { code: fallbackCode } as never,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Payment"
        title="Complete Your Payment"
        subtitle="Scan the UPI QR code or pay with your UPI app, then confirm on WhatsApp."
      />

      <section className="mx-auto max-w-3xl px-4 py-10">
        <div className="luxe-card overflow-hidden">
          {/* Top Banner: Order Total */}
          <div className="border-b border-border bg-charcoal/80 p-6 text-center">
            <p className="eyebrow">Order Total</p>
            <p className="mt-2 text-4xl md:text-5xl font-serif text-gold">
              {formatINR(draft.total)}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Includes {formatINR(draft.deliveryFee)} delivery charge
            </p>
          </div>

          <div className="p-6 md:p-10 space-y-8">
            {/* Placeholder disclaimer if configured as placeholder */}
            {isPlaceholder && (
              <div className="rounded-xl border border-gold/40 bg-gold/10 p-4 text-xs text-foreground/80 flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gold">Configurable Demo UPI Notice:</span>
                  <p className="mt-0.5 text-muted-foreground">
                    This UPI ID ({upiId}) is an editable placeholder. The business owner can set
                    their actual UPI ID and QR code in the Admin Dashboard at any time.
                  </p>
                </div>
              </div>
            )}

            {/* QR Code section */}
            <div className="text-center">
              <p className="text-sm font-medium tracking-wide text-foreground/90">
                Scan & Pay using any UPI app (GPay, PhonePe, Paytm, BHIM)
              </p>

              <div className="mt-6 inline-block rounded-3xl border-2 border-gold/40 bg-card p-4 shadow-gold">
                <img
                  src={qrImageUrl}
                  alt="UPI QR Code"
                  className="h-56 w-56 md:h-64 md:w-64 rounded-2xl object-contain mx-auto"
                />
                <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <QrCode className="h-3.5 w-3.5 text-gold" />
                  <span>Scan to pay {formatINR(draft.total)}</span>
                </div>
              </div>
            </div>

            {/* UPI ID Copy Card */}
            <div className="mx-auto max-w-md rounded-2xl border border-border bg-charcoal p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">UPI ID / VPA</p>
              <div className="mt-1 flex items-center justify-between gap-3">
                <span className="font-mono text-sm font-semibold text-foreground truncate">
                  {upiId}
                </span>
                <button
                  type="button"
                  onClick={copyUpiId}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-xs font-semibold text-gold hover:bg-gold/20 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> Copy ID
                    </>
                  )}
                </button>
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                Payee: <span className="text-foreground/80">{merchantName}</span>
              </p>
            </div>

            {/* Mobile UPI Deep Link Button */}
            <div className="text-center sm:hidden">
              <a
                href={upiUrl}
                className="inline-flex items-center justify-center gap-2 w-full rounded-full border border-gold px-6 py-3 text-sm font-semibold text-gold hover:bg-gold/10 transition-colors"
              >
                <Smartphone className="h-4 w-4" /> Pay with UPI App (Mobile Only)
              </a>
            </div>

            <div className="hairline-gold" />

            {/* WhatsApp Confirmation Action */}
            <div className="text-center space-y-4">
              <p className="text-sm text-foreground/90 max-w-md mx-auto">
                After completing your payment, click the button below. Your order details will be
                automatically sent to Gold Taste on WhatsApp.
              </p>

              <button
                type="button"
                onClick={handleConfirmOnWhatsApp}
                disabled={submitting}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gold px-9 py-4 text-base font-semibold text-primary-foreground shadow-gold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {submitting ? (
                  "Placing Order..."
                ) : (
                  <>
                    <span>Payment Completed — Confirm on WhatsApp</span>
                    <ExternalLink className="h-4 w-4" />
                  </>
                )}
              </button>

              <p className="text-xs text-muted-foreground">
                Our kitchen manually verifies each payment before preparing and dispatching your halwa.
              </p>
            </div>

            {/* Navigation back */}
            <div className="pt-2 flex justify-start">
              <Link
                to="/checkout"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Delivery Details
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
