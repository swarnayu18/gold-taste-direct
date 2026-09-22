import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader, SiteLayout } from "@/components/site/SiteLayout";
import { BRAND, HELP_MESSAGE, whatsappLink } from "@/lib/brand";
import { useSettings } from "@/lib/shop";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Gold Taste Malda" },
      {
        name: "description",
        content:
          "Get in touch with Gold Taste halwa kitchen in Malda. Call, WhatsApp or email us for orders and inquiries.",
      },
      { property: "og:title", content: "Contact Us | Gold Taste Malda" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { data: settings } = useSettings();
  const contact = settings?.contact ?? {
    phone: BRAND.phone,
    whatsapp: BRAND.whatsapp,
    email: BRAND.email,
    address: BRAND.address,
    maps_embed_url: "",
  };

  const [form, setForm] = useState({
    name: "",
    phone: "",
    topic: "general",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      toast.error("Please fill in your name, phone number, and message.");
      return;
    }

    const topicLabels: Record<string, string> = {
      general: "General Inquiry",
      bulk: "Party / Bulk Order",
      custom: "Special Halwa Request",
    };

    const text = [
      `Hello Gold Taste 👋`,
      `I am reaching out through your website.`,
      ``,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Inquiry: ${topicLabels[form.topic] || form.topic}`,
      `Message: ${form.message}`,
    ].join("\n");

    const url = whatsappLink(text, contact.whatsapp);
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp to send your inquiry");
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Get In Touch"
        title="We Would Love to Hear From You"
        subtitle="Have a question about our halwa, party orders, or delivery timing? Reach out to our kitchen."
      />

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          {/* Contact Details Card */}
          <div className="space-y-6">
            <div className="luxe-card p-6 md:p-8 space-y-6">
              <h2 className="text-2xl font-serif">Kitchen Contact</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We are a local home-based halwa kitchen based in Malda, West Bengal. You can call or
                message us directly for immediate help with your order.
              </p>

              <div className="space-y-5 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Kitchen Address</p>
                    <p className="text-sm font-medium text-foreground mt-0.5">{contact.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Direct Call</p>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-sm font-medium text-foreground hover:text-gold transition-colors mt-0.5 block"
                    >
                      +91 {contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">WhatsApp Assistance</p>
                    <a
                      href={whatsappLink(HELP_MESSAGE, contact.whatsapp)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-foreground hover:text-gold transition-colors mt-0.5 block"
                    >
                      +91 {contact.whatsapp} (Instant Chat)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Email</p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm font-medium text-foreground hover:text-gold transition-colors mt-0.5 block"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex flex-wrap gap-2.5">
                <a
                  href={`tel:${contact.phone}`}
                  className="rounded-full bg-gold px-5 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
                >
                  Call Now
                </a>
                <a
                  href={whatsappLink(HELP_MESSAGE, contact.whatsapp)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-gold px-5 py-2 text-xs font-semibold text-gold hover:bg-gold/10"
                >
                  WhatsApp
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="rounded-full border border-border px-5 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  Email Us
                </a>
              </div>
            </div>

            {/* Location map preview / card */}
            <div className="luxe-card p-6 overflow-hidden">
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" /> Malda, West Bengal
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Ar Ki Mirchok Road, Malda, West Bengal, India
              </p>
              <div className="aspect-video w-full rounded-xl border border-border bg-charcoal flex items-center justify-center text-center p-6">
                <div>
                  <Sparkles className="h-6 w-6 text-gold mx-auto mb-2 opacity-70" />
                  <p className="text-xs text-muted-foreground">
                    Home Kitchen location in Malda Town. Doorstep delivery available across town.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Special Orders Form */}
          <div className="luxe-card p-6 md:p-8">
            <h2 className="text-2xl font-serif">Send an Inquiry</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Planning a celebration, festival or family dinner? Send us your message and we will
              connect on WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-foreground/80 font-medium">
                  Your Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sourav Mukherjee"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-foreground/80 font-medium">
                  Phone / WhatsApp Number <span className="text-destructive">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-foreground/80 font-medium">
                  Inquiry Type
                </label>
                <select
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
                >
                  <option value="general">General Inquiry / Question</option>
                  <option value="bulk">Party / Bulk Order (5kg+)</option>
                  <option value="custom">Special Halwa Request</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-foreground/80 font-medium">
                  Message <span className="text-destructive">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us what you'd like to order or ask..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-border bg-charcoal px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  <Send className="h-4 w-4" /> Send via WhatsApp
                </button>
                <p className="mt-2 text-center text-[11px] text-muted-foreground">
                  Clicking will open WhatsApp with your message ready to send.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
