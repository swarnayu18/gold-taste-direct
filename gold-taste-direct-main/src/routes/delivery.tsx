import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle, Clock, MapPin, Package, Shield, Sparkles, Truck } from "lucide-react";
import { PageHeader, SiteLayout, WhatsAppHelpLink } from "@/components/site/SiteLayout";
import { formatINR } from "@/lib/brand";
import { deliveryFeeFor, etaFor, useSettings } from "@/lib/shop";

export const Route = createFileRoute("/delivery")({
  head: () => ({
    meta: [
      { title: "Delivery Information | Gold Taste Malda" },
      {
        name: "description",
        content:
          "Find out how Gold Taste delivers fresh halwa across Malda Town (1–2 days) and nearby areas (2–3 days).",
      },
      { property: "og:title", content: "Delivery Information | Gold Taste Malda" },
    ],
  }),
  component: DeliveryPage,
});

function DeliveryPage() {
  const { data: settings } = useSettings();

  const maldaFee = deliveryFeeFor("malda_town", settings?.delivery);
  const outsideFee = deliveryFeeFor("outside_malda", settings?.delivery);
  const maldaEta = etaFor("malda_town", settings?.delivery);
  const outsideEta = etaFor("outside_malda", settings?.delivery);
  const minOrder = Number(settings?.delivery?.minimum_order ?? 0);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Delivery & Packing"
        title="Freshness Meets Your Doorstep"
        subtitle="We deliver our freshly cooked halwa with care throughout Malda and surrounding locations."
      />

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {/* Zone Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Malda Town */}
          <div className="luxe-card p-8 relative overflow-hidden flex flex-col justify-between border-gold/30">
            <div className="absolute top-0 right-0 bg-gold/10 text-gold px-4 py-1.5 rounded-bl-2xl text-xs font-semibold uppercase tracking-wider">
              Local Zone
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold mb-5">
                <MapPin className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-serif">Malda Town</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Freshly prepared and delivered within Malda Town municipal limits and immediate
                neighbourhoods.
              </p>

              <div className="mt-6 space-y-3 border-t border-border pt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Delivery:</span>
                  <span className="font-semibold text-foreground flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-gold" /> {maldaEta}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Charge:</span>
                  <span className="font-semibold text-gold">
                    {maldaFee === 0 ? "Free Delivery" : formatINR(maldaFee)}
                  </span>
                </div>
                {minOrder > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Minimum Order:</span>
                    <span className="text-foreground">{formatINR(minOrder)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <Link
                to="/products"
                className="block w-full text-center rounded-full bg-gold py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Order for Malda Town
              </Link>
            </div>
          </div>

          {/* Outside Malda Town */}
          <div className="luxe-card p-8 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 bg-card border-b border-l border-border text-muted-foreground px-4 py-1.5 rounded-bl-2xl text-xs font-semibold uppercase tracking-wider">
              Extended Zone
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-border/40 text-foreground mb-5">
                <Truck className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-serif">Outside Malda Town</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Delivery to surrounding towns, rural blocks and adjacent postal zones in Malda
                district.
              </p>

              <div className="mt-6 space-y-3 border-t border-border pt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Delivery:</span>
                  <span className="font-semibold text-foreground flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-gold" /> {outsideEta}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Charge:</span>
                  <span className="font-semibold text-gold">
                    {outsideFee === 0 ? "Free Delivery" : formatINR(outsideFee)}
                  </span>
                </div>
                {minOrder > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Minimum Order:</span>
                    <span className="text-foreground">{formatINR(minOrder)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <Link
                to="/products"
                className="block w-full text-center rounded-full border border-gold py-3 text-sm font-semibold text-gold hover:bg-gold/10 transition-colors"
              >
                Order for Outside Malda
              </Link>
            </div>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="mt-8 rounded-2xl border border-border bg-charcoal p-5 text-xs text-muted-foreground leading-relaxed text-center">
          <p>
            ⚠️ Delivery times are estimated and may vary depending on order volume, location and
            other local delivery conditions. Since every batch is cooked fresh after you order, we
            appreciate your patience!
          </p>
        </div>

        {/* Packaging Standards */}
        <div className="mt-16 border-t border-border pt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="eyebrow">Quality & Hygiene</span>
            <h2 className="mt-3 text-3xl font-serif">How Your Halwa is Packed</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Food safety and packaging integrity are non-negotiable in our home kitchen.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="luxe-card p-6">
              <Package className="h-8 w-8 text-gold mb-4" />
              <h3 className="text-lg font-serif">Food-Grade Sealed Trays</h3>
              <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
                Every box is packed in heat-resistant, certified food-safe containers to prevent ghee
                leakage and keep outside air out.
              </p>
            </div>

            <div className="luxe-card p-6">
              <Sparkles className="h-8 w-8 text-gold mb-4" />
              <h3 className="text-lg font-serif">Fresh Cooking Guarantee</h3>
              <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
                We never dispatch pre-stocked halwa. Your order is slow-cooked after order
                confirmation so it arrives rich and aromatic.
              </p>
            </div>

            <div className="luxe-card p-6">
              <Shield className="h-8 w-8 text-gold mb-4" />
              <h3 className="text-lg font-serif">Tamper-Proof Box</h3>
              <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
                Secured with Gold Taste brand seals so you have complete peace of mind that nobody
                has opened the box in transit.
              </p>
            </div>
          </div>
        </div>

        {/* Delivery FAQs */}
        <div className="mt-16 border-t border-border pt-16 max-w-3xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <span className="eyebrow">Answers</span>
            <h2 className="mt-2 text-3xl font-serif">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            <div className="luxe-card p-5">
              <h4 className="font-semibold text-sm">How do I store and reheat the halwa?</h4>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Our halwa can be enjoyed warm or at room temperature. We recommend storing it in a
                refrigerator once opened. To reheat, microwave for 20–30 seconds or warm gently in a pan
                with a teaspoon of ghee.
              </p>
            </div>

            <div className="luxe-card p-5">
              <h4 className="font-semibold text-sm">Can I schedule delivery for a specific date?</h4>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Yes! When confirming your order on WhatsApp, simply let our team know your preferred
                delivery date and time for birthdays, pujas, or special family gatherings.
              </p>
            </div>

            <div className="luxe-card p-5">
              <h4 className="font-semibold text-sm">Do you offer cash on delivery (COD)?</h4>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Because each batch of halwa is freshly prepared and personalized for you, we currently
                operate on prepaid UPI orders only. Payment is manually verified before we begin cooking.
              </p>
            </div>
          </div>

          <div className="pt-6 text-center">
            <p className="text-sm text-muted-foreground">Have additional delivery questions?</p>
            <div className="mt-3 flex justify-center">
              <WhatsAppHelpLink />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
