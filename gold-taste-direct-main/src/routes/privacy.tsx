import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/site/SiteLayout";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Gold Taste Malda" },
      { name: "description", content: "Privacy Policy for Gold Taste homemade halwa and sweets in Malda." },
      { property: "og:title", content: "Privacy Policy | Gold Taste Malda" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How Gold Taste handles and protects your personal information."
      />

      <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <div className="luxe-card p-6 md:p-10 space-y-8 text-sm text-foreground/85 leading-relaxed">
          <div>
            <h2 className="text-xl font-serif text-foreground mb-3">1. Information We Collect</h2>
            <p>
              When you place an order with Gold Taste, we collect only the information necessary to
              prepare and deliver your halwa:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground">
              <li>Your full name</li>
              <li>Your contact mobile number and WhatsApp number</li>
              <li>Your complete delivery address (street, area, city, pincode)</li>
              <li>Optional email address if provided</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-serif text-foreground mb-3">2. How We Use Your Information</h2>
            <p>We use your personal details strictly for the following operational purposes:</p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground">
              <li>Processing your halwa order and confirming payment via WhatsApp</li>
              <li>Dispatching and delivering your food parcel to your specified doorstep in Malda</li>
              <li>Providing customer support regarding order modifications or delivery status</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-serif text-foreground mb-3">3. Payment Information & Security</h2>
            <p>
              We do not store your bank account numbers, UPI PINs, or debit/credit card information.
              All payments are made through customer-initiated UPI applications (Google Pay, PhonePe,
              Paytm, BHIM) directly to our merchant VPA. Verification is conducted manually by
              cross-referencing payment confirmation receipts.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif text-foreground mb-3">4. Third-Party Sharing</h2>
            <p>
              We do not sell, rent, or trade your personal information to third-party marketing
              companies. Your address and contact number are shared only with our local delivery
              personnel solely for the purpose of completing delivery.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-serif text-foreground mb-3">5. Data Retention & Contact</h2>
            <p>
              Order records are retained in our secure database for accounting and customer support
              history. If you wish to request deletion of your information or have privacy questions,
              please reach out:
            </p>
            <div className="mt-3 p-4 rounded-xl border border-border bg-charcoal text-xs space-y-1">
              <p>
                <strong className="text-foreground">{BRAND.name}</strong>
              </p>
              <p className="text-muted-foreground">{BRAND.address}</p>
              <p className="text-muted-foreground">Phone / WhatsApp: {BRAND.phone}</p>
              <p className="text-muted-foreground">Email: {BRAND.email}</p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
