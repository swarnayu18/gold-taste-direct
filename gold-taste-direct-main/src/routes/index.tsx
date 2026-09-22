import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, PackageCheck, Sparkles, Truck } from "lucide-react";
import { SiteLayout, WhatsAppHelpLink } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { BRAND, heroImage, packagingImage } from "@/lib/brand";
import { useGallery, useProducts, useSettings, useTestimonials } from "@/lib/shop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gold Taste | Premium Halwa in Malda" },
      {
        name: "description",
        content:
          "Gold Taste offers premium homemade halwa in Malda with convenient local delivery. Order fresh traditional halwa and sweets online.",
      },
      { property: "og:title", content: "Gold Taste | Premium Halwa in Malda" },
      {
        property: "og:description",
        content:
          "Gold Taste offers premium homemade halwa in Malda with convenient local delivery. Order fresh traditional halwa and sweets online.",
      },
    ],
  }),
  component: Home,
});

const WHY = [
  { icon: Sparkles, title: "Freshly Prepared", text: "Every batch is cooked in small quantities after your order." },
  { icon: Leaf, title: "Traditional Taste", text: "Slow-cooked the homely way, rich in flavour and aroma." },
  { icon: PackageCheck, title: "Carefully Packed", text: "Sealed and boxed neatly so it travels and gifts well." },
  { icon: Truck, title: "Local Delivery", text: "Delivered across Malda Town and nearby areas." },
];

function Home() {
  const { data: products } = useProducts();
  const { data: gallery } = useGallery();
  const { data: testimonials } = useTestimonials();
  const { data: settings } = useSettings();

  const featured = (products ?? []).filter((p) => p.is_featured).slice(0, 3);
  const showcase = featured.length ? featured : (products ?? []).slice(0, 3);

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FoodEstablishment",
            name: BRAND.name,
            description: "Premium homemade halwa in Malda, West Bengal with local delivery.",
            telephone: BRAND.phone,
            email: BRAND.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: "Ar Ki Mirchok Road",
              addressLocality: "Malda",
              addressRegion: "West Bengal",
              addressCountry: "IN",
            },
            servesCuisine: "Indian sweets",
          }),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-24">
          <div className="reveal-up">
            <p className="eyebrow">{BRAND.secondaryTagline}</p>
            <h1 className="mt-4 text-5xl leading-[1.05] md:text-6xl">
              <span className="text-gold-gradient">Gold Taste</span>
              <br />
              Premium Halwa
            </h1>
            <p className="mt-5 max-w-md text-muted-foreground">
              Home-made halwa from Malda, West Bengal — slow-cooked in small batches, packed with
              care, and delivered to your door.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Order Now
              </Link>
              <WhatsAppHelpLink />
            </div>
          </div>
          <div className="relative">
            <div className="pattern-ornament absolute -inset-4 rounded-4xl opacity-60" />
            <img
              src={heroImage}
              alt="Freshly prepared Gold Taste halwa"
              className="luxe-card relative aspect-4/3 w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why Gold Taste */}
      <section className="border-y border-border bg-charcoal">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <p className="eyebrow text-center">Why Gold Taste</p>
          <h2 className="mt-3 text-center text-3xl md:text-4xl">Small batch. Big on flavour.</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w) => (
              <div key={w.title} className="luxe-card p-6">
                <w.icon className="h-7 w-7 text-gold" />
                <h3 className="mt-4 text-xl">{w.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Our Halwa</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Handpicked favourites</h2>
          </div>
          <Link to="/products" className="text-sm text-gold hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {showcase.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* About teaser */}
      <section className="border-y border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <img
            src={packagingImage}
            alt="Gold Taste halwa packed for delivery"
            loading="lazy"
            className="luxe-card aspect-4/3 w-full object-cover"
          />
          <div>
            <p className="eyebrow">About Us</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Made With Tradition. Presented With Care.</h2>
            <p className="mt-4 text-muted-foreground">
              Gold Taste is a small home-based halwa kitchen in Malda. We cook the way families
              always have — patiently, in small quantities, using simple ingredients — and present
              every box so it feels like a gift.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex rounded-full border border-gold px-6 py-3 text-sm font-medium text-gold"
            >
              Read our story
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      {(gallery ?? []).length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <p className="eyebrow">Gallery</p>
          <h2 className="mt-3 text-3xl md:text-4xl">From our kitchen</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {(gallery ?? []).slice(0, 4).map((g) => (
              <img
                key={g.id}
                src={g.image_url}
                alt={g.caption ?? "Gold Taste halwa"}
                loading="lazy"
                className="aspect-square w-full rounded-2xl border border-border object-cover"
              />
            ))}
          </div>
          <Link to="/gallery" className="mt-6 inline-block text-sm text-gold hover:underline">
            See full gallery
          </Link>
        </section>
      )}

      {/* Testimonials */}
      {(testimonials ?? []).length > 0 && (
        <section className="border-y border-border bg-charcoal">
          <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
            <p className="eyebrow">Testimonials</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Placeholder reviews</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              These are editable placeholders — replace them with real customer words from the admin
              panel.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {(testimonials ?? []).slice(0, 3).map((t) => (
                <figure key={t.id} className="luxe-card p-6">
                  <blockquote className="text-sm text-foreground/85">“{t.message}”</blockquote>
                  <figcaption className="mt-4 text-xs tracking-widest text-gold uppercase">
                    {t.name}
                    {t.location ? ` • ${t.location}` : ""}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Delivery + contact CTA */}
      <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="luxe-card grid gap-6 p-8 md:grid-cols-2 md:p-12">
          <div>
            <p className="eyebrow">Delivery</p>
            <h2 className="mt-3 text-3xl">We deliver in and around Malda</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Malda Town — {settings?.delivery.malda_eta ?? "1–2 days"}</li>
              <li>Outside Malda Town — {settings?.delivery.outside_eta ?? "2–3 days"}</li>
            </ul>
          </div>
          <div className="flex flex-col justify-center gap-3">
            <Link
              to="/products"
              className="rounded-full bg-gold px-7 py-3.5 text-center text-sm font-semibold text-primary-foreground"
            >
              Start your order
            </Link>
            <WhatsAppHelpLink />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
