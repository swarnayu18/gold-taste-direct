import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader, SiteLayout } from "@/components/site/SiteLayout";
import { formatINR, isValidIndianMobile, isValidPincode, productImage } from "@/lib/brand";
import { useCart } from "@/lib/cart";
import { loadDraft, saveDraft } from "@/lib/order-draft";
import { deliveryFeeFor, etaFor, useSettings, zoneLabel } from "@/lib/shop";
import type { CheckoutDetails, DeliveryZone, OrderDraft } from "@/lib/types";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Gold Taste Malda" },
      { name: "description", content: "Enter your delivery details and review your Gold Taste halwa order." },
      { property: "og:title", content: "Checkout | Gold Taste Malda" },
      { property: "og:description", content: "Enter your delivery details and review your Gold Taste halwa order." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const { lines, subtotal } = useCart();
  const { data: settings } = useSettings();

  const initialDraft = loadDraft();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [details, setDetails] = useState<CheckoutDetails>(() => ({
    fullName: initialDraft?.details.fullName ?? "",
    mobile: initialDraft?.details.mobile ?? "",
    whatsapp: initialDraft?.details.whatsapp ?? "",
    email: initialDraft?.details.email ?? "",
    address: initialDraft?.details.address ?? "",
    area: initialDraft?.details.area ?? "",
    city: initialDraft?.details.city || "Malda",
    state: initialDraft?.details.state || "West Bengal",
    pincode: initialDraft?.details.pincode ?? "",
    zone: initialDraft?.details.zone || "malda_town",
  }));

  const [sameAsMobile, setSameAsMobile] = useState(
    !initialDraft?.details.whatsapp || initialDraft.details.whatsapp === initialDraft.details.mobile,
  );

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

  const handleNextFromStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextFromStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleProceedToPayment = () => {
    if (!validateStep1() || !validateStep2()) return;
    if (lines.length === 0) {
      toast.error("Your cart is empty. Please add items before checking out.");
      navigate({ to: "/products" });
      return;
    }

    const draft: OrderDraft = {
      details: {
        ...details,
        whatsapp: sameAsMobile ? details.mobile : details.whatsapp || details.mobile,
      },
      lines,
      subtotal,
      deliveryFee,
      total,
    };

    saveDraft(draft);
    navigate({ to: "/payment" });
  };

  if (lines.length === 0) {
    return (
      <SiteLayout>
        <PageHeader eyebrow="Checkout" title="Your Cart is Empty" />
        <div className="mx-auto max-w-xl px-4 py-16 text-center">
          <div className="luxe-card p-10">
            <p className="text-lg">You don't have any halwa in your cart to checkout.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Please browse our freshly prepared halwa selection first.
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

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Checkout"
        title="Delivery Details"
        subtitle="Complete your details to place your fresh halwa order."
      />

      <section className="mx-auto max-w-5xl px-4 py-10">
        {/* Stepper Header */}
        <div className="mb-10 flex items-center justify-between border-b border-border pb-6">
          {[
            { num: 1, label: "Customer Info" },
            { num: 2, label: "Delivery Address" },
            { num: 3, label: "Review & Pay" },
          ].map((s, idx) => {
            const isCompleted = step > s.num;
            const isCurrent = step === s.num;
            return (
              <div key={s.num} className="flex flex-1 items-center">
                <button
                  type="button"
                  onClick={() => {
                    if (s.num === 1) setStep(1);
                    if (s.num === 2 && validateStep1()) setStep(2);
                  }}
                  className="flex items-center gap-2 text-left text-xs md:text-sm font-medium transition-colors"
                >
                  <span
                    className={`inline-flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full text-xs font-semibold ${
                      isCompleted
                        ? "bg-gold text-primary-foreground"
                        : isCurrent
                          ? "border border-gold text-gold"
                          : "border border-border text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? <Check className="h-4 w-4" /> : s.num}
                  </span>
                  <span className={isCurrent ? "text-gold font-semibold" : "text-muted-foreground"}>
                    {s.label}
                  </span>
                </button>
                {idx < 2 && (
                  <div
                    className={`mx-3 hidden h-px flex-1 sm:block ${
                      isCompleted ? "bg-gold" : "bg-border"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Main Step Form */}
          <div>
            {step === 1 && (
              <form onSubmit={handleNextFromStep1} className="luxe-card p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-serif">Step 1: Contact Information</h2>
                  <p className="mt-1 text-xs md:text-sm text-muted-foreground">
                    We will use these details to contact you for payment verification and delivery.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-foreground/80">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sen"
                      value={details.fullName}
                      onChange={(e) => setDetails({ ...details, fullName: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-foreground/80">
                      Mobile Number (10 digits) <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="9876543210"
                      value={details.mobile}
                      onChange={(e) =>
                        setDetails({ ...details, mobile: e.target.value.replace(/\D/g, "") })
                      }
                      className="mt-2 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div className="pt-1">
                    <label className="flex items-center gap-2 text-sm text-foreground/90 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sameAsMobile}
                        onChange={(e) => setSameAsMobile(e.target.checked)}
                        className="accent-gold h-4 w-4 rounded"
                      />
                      WhatsApp number is same as mobile number
                    </label>
                  </div>

                  {!sameAsMobile && (
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-foreground/80">
                        WhatsApp Number <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="9876543210"
                        value={details.whatsapp}
                        onChange={(e) =>
                          setDetails({ ...details, whatsapp: e.target.value.replace(/\D/g, "") })
                        }
                        className="mt-2 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-foreground/80">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="rahul@example.com"
                      value={details.email}
                      onChange={(e) => setDetails({ ...details, email: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold">
                    <ArrowLeft className="h-4 w-4" /> Back to Cart
                  </Link>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    Next: Delivery Address <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleNextFromStep2} className="luxe-card p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-serif">Step 2: Delivery Address</h2>
                  <p className="mt-1 text-xs md:text-sm text-muted-foreground">
                    Please provide your complete delivery address in or around Malda.
                  </p>
                </div>

                {/* Delivery Zone Radio Cards */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-foreground/80 mb-2">
                    Select Delivery Zone <span className="text-destructive">*</span>
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {(["malda_town", "outside_malda"] as DeliveryZone[]).map((zone) => {
                      const fee = deliveryFeeFor(zone, settings?.delivery);
                      const eta = etaFor(zone, settings?.delivery);
                      const isSelected = details.zone === zone;
                      return (
                        <button
                          key={zone}
                          type="button"
                          onClick={() => setDetails({ ...details, zone })}
                          className={`rounded-2xl border p-4 text-left transition-all ${
                            isSelected
                              ? "border-gold bg-gold/10 shadow-gold"
                              : "border-border bg-charcoal hover:border-gold/50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm">{zoneLabel(zone)}</span>
                            <span className="text-xs font-medium text-gold">
                              {fee === 0 ? "Free Delivery" : formatINR(fee)}
                            </span>
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
                            <Truck className="h-3.5 w-3.5 text-gold" /> Estimated: {eta}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-foreground/80">
                      Street Address / House / Flat No. <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="e.g. Flat 3B, Sunshine Apartments, Near Railway Station"
                      value={details.address}
                      onChange={(e) => setDetails({ ...details, address: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-foreground/80">
                        Area / Locality <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. English Bazar"
                        value={details.area}
                        onChange={(e) => setDetails({ ...details, area: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-foreground/80">
                        City <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={details.city}
                        onChange={(e) => setDetails({ ...details, city: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-foreground/80">
                        State <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={details.state}
                        onChange={(e) => setDetails({ ...details, state: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-foreground/80">
                        Pincode (6 digits) <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="732101"
                        value={details.pincode}
                        onChange={(e) =>
                          setDetails({ ...details, pincode: e.target.value.replace(/\D/g, "") })
                        }
                        className="mt-2 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back to Contact
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    Next: Review Order <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="luxe-card p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-serif">Step 3: Review Your Order</h2>
                  <p className="mt-1 text-xs md:text-sm text-muted-foreground">
                    Confirm your items, delivery details, and proceed to the UPI payment screen.
                  </p>
                </div>

                {/* Contact and address summary cards */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border bg-charcoal p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-gold">Recipient</span>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs text-muted-foreground hover:text-gold underline"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="mt-2 text-sm font-medium">{details.fullName}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Mobile: {details.mobile}</p>
                    {details.whatsapp && (
                      <p className="text-xs text-muted-foreground">WhatsApp: {details.whatsapp}</p>
                    )}
                    {details.email && <p className="text-xs text-muted-foreground">{details.email}</p>}
                  </div>

                  <div className="rounded-xl border border-border bg-charcoal p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-gold">Delivery</span>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-xs text-muted-foreground hover:text-gold underline"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="mt-2 text-sm font-medium">{zoneLabel(details.zone)}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {details.address}, {details.area}, {details.city} - {details.pincode}
                    </p>
                    <p className="mt-1 text-xs text-gold">ETA: {etaFor(details.zone, settings?.delivery)}</p>
                  </div>
                </div>

                {/* Items preview */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs uppercase tracking-widest text-gold">Halwa Selection</span>
                  <div className="divide-y divide-border rounded-xl border border-border bg-charcoal">
                    {lines.map((l) => (
                      <div key={`${l.slug}-${l.weightLabel}`} className="flex items-center gap-3 p-3">
                        <img
                          src={productImage(l.slug, l.imageUrl)}
                          alt={l.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{l.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {l.weightLabel} × {l.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gold">
                          {formatINR(l.price * l.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-gold/30 bg-gold/5 p-4 text-xs text-muted-foreground flex items-start gap-2.5">
                  <ShieldCheck className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">Transparent Ordering:</span>
                    <p className="mt-0.5">
                      On the next screen you can scan our UPI QR or use your UPI app. You will then
                      confirm your order on WhatsApp where our team verifies your payment before cooking.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back to Address
                  </button>
                  <button
                    type="button"
                    onClick={handleProceedToPayment}
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    Continue to Payment <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar order summary */}
          <aside className="luxe-card h-fit p-6 space-y-4">
            <h3 className="text-xl font-serif">Order Summary</h3>
            <div className="divide-y divide-border text-sm">
              <div className="py-2.5 flex justify-between text-muted-foreground">
                <span>Items ({lines.reduce((s, l) => s + l.quantity, 0)})</span>
                <span className="text-foreground">{formatINR(subtotal)}</span>
              </div>
              <div className="py-2.5 flex justify-between text-muted-foreground">
                <span>Delivery ({zoneLabel(details.zone)})</span>
                <span className="text-foreground">
                  {deliveryFee === 0 ? "Free" : formatINR(deliveryFee)}
                </span>
              </div>
              <div className="py-3 flex justify-between text-base font-semibold">
                <span>Total Amount</span>
                <span className="text-gold text-lg">{formatINR(total)}</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Estimated delivery: <span className="text-gold">{etaFor(details.zone, settings?.delivery)}</span>
            </p>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
