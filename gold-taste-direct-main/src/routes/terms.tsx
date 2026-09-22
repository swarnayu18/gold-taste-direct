import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/site/SiteLayout";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Gold Taste Malda" },
      { name: "description", content: "Terms and conditions for ordering homemade halwa from Gold Taste in Malda." },
      { property: "og:title", content: "Terms & Conditions | Gold Taste Malda" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Legal"
        title="Terms & Conditions"
        subtitle="Please read these terms carefully before placing an order with Gold Taste."
      />

      <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <div className="luxe-card p-6 md:p-10 space-y-8 text-sm text-foreground/85 leading-relaxed">
          <div>
            <h2 className="text-xl font-serif text-foreground mb-3">1. Ordering & Acceptance</h2>
            <p>
              Gold Taste operates a home-based kitchen in Malda, West Bengal. When you submit an
              order on this website and confirm via WhatsApp, your order is subject to acceptance and
              availability of fresh ingredients. An order is deemed confirmed only after our kitchen
              team verifies your UPI payment.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif text-foreground mb-3">2. Pricing & Placeholder Information</h2>
            <p>
              All prices listed on the website are in Indian Rupees (INR) and represent our current
              menu charges. Certain items or demo configurations may carry placeholder designations
              until finalized by the business owner. Final prices and delivery fees displayed at
              checkout are binding for that specific order.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif text-foreground mb-3">3. Payment & Verification</h2>
            <p>
              Orders must be prepaid using Unified Payments Interface (UPI). We do not provide
              automated bank settlement; our kitchen team manually cross-references the transaction
              reference sent by the customer on WhatsApp before beginning kitchen preparation.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif text-foreground mb-3">4. Perishable Goods & Cancellation Policy</h2>
            <p>
              Our halwa dishes are freshly prepared, perishable culinary items cooked specifically
              for each customer.
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground">
              <li>
                Cancellations can be made within 30 minutes of order placement provided cooking has not
                yet commenced.
              </li>
              <li>
                Once halwa preparation has started or the package is dispatched, orders cannot be
                cancelled or returned.
              </li>
              <li>
                In the rare event of damaged packaging during transit, please contact us immediately on
                WhatsApp with a photograph for prompt resolution.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-serif text-foreground mb-3">5. Delivery Timelines</h2>
            <p>
              Delivery timeframes (1–2 days for Malda Town, 2–3 days for Outside Malda) are
              estimates based on normal cooking and transit conditions. Unforeseen weather or local
              disturbances may affect timing, and our team will keep you updated via WhatsApp.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif text-foreground mb-3">6. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of India, and
              any disputes shall be subject to the exclusive jurisdiction of the courts in Malda, West
              Bengal.
            </p>
          </div>

          <div className="pt-4 border-t border-border text-xs text-muted-foreground">
            Last updated: September 2026 • {BRAND.name}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
