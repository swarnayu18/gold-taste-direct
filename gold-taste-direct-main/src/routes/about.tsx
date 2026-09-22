import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Heart, Leaf, PackageCheck, Sparkles, Truck } from "lucide-react";
import { PageHeader, SiteLayout, WhatsAppHelpLink } from "@/components/site/SiteLayout";
import { BRAND, heroImage, ingredientsImage, packagingImage } from "@/lib/brand";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Gold Taste Malda" },
      {
        name: "description",
        content:
          "Learn about Gold Taste — homemade premium halwa in Malda, West Bengal, slow-cooked in small batches with traditional ingredients.",
      },
      { property: "og:title", content: "About Us | Gold Taste Malda" },
      {
        property: "og:description",
        content: "Traditional recipes, rich flavours and freshly prepared halwa in Malda.",
      },
    ],
  }),
  component: AboutPage,
});

const PILLARS = [
  {
    num: "01",
    icon: Sparkles,
    title: "Freshly Prepared",
    text: "We cook our halwa in small home-kitchen batches only after orders are received, ensuring maximum aroma and tenderness in every bite.",
  },
  {
    num: "02",
    icon: Leaf,
    title: "Traditional Taste",
    text: "Every recipe honors classic Indian sweet-making: pure cow ghee, grated carrots, slow-roasted semolina or moong dal, and crushed green cardamom.",
  },
  {
    num: "03",
    icon: PackageCheck,
    title: "Carefully Packed",
    text: "Our boxes are sealed to lock in warmth, freshness and purity, packaged so gracefully that they feel like a thoughtful gift.",
  },
  {
    num: "04",
    icon: Truck,
    title: "Local Delivery",
    text: "Convenient local doorstep delivery throughout Malda Town (1–2 days) and nearby localities (2–3 days).",
  },
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Our Story"
        title="Made With Tradition. Presented With Care."
        subtitle="The story of a passionate home kitchen dedicated to bringing genuine, slow-cooked halwa to Malda."
      />

      {/* Main Story Section */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <span className="eyebrow">Home-Cooked Warmth</span>
            <h2 className="text-3xl md:text-4xl font-serif leading-tight">
              A Taste Worth Remembering
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Gold Taste is a home-based premium halwa brand serving Malda and nearby customers with
              traditionally inspired sweet flavours and carefully prepared products.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We started with a simple belief: real Indian halwa should never come from mass-produced
              factory shelves. It deserves slow roasting, patient stirring over gentle heat, and the
              unmistakable aroma of golden ghee and whole spices that fills a home during festive
              gatherings.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Explore Our Halwa
              </Link>
              <WhatsAppHelpLink />
            </div>
          </div>

          <div className="relative">
            <div className="pattern-ornament absolute -inset-4 rounded-3xl opacity-50" />
            <img
              src={heroImage}
              alt="Freshly prepared halwa"
              className="luxe-card relative aspect-4/3 w-full object-cover shadow-luxe"
            />
          </div>
        </div>
      </section>

      {/* Pillars of Gold Taste */}
      <section className="border-y border-border bg-charcoal">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">The Four Pillars</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-serif">Why Gold Taste is Special</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              We focus on doing a few things with complete honesty, patience and pride.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.num} className="luxe-card p-6 flex flex-col justify-between">
                  <div>
                    <span className="font-serif text-2xl text-gold/40">{p.num}</span>
                    <Icon className="h-7 w-7 text-gold mt-3" />
                    <h3 className="mt-4 text-xl font-serif">{p.title}</h3>
                    <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {p.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ingredients & Crafting */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="order-2 lg:order-1">
            <img
              src={ingredientsImage}
              alt="Halwa ingredients"
              className="luxe-card aspect-4/3 w-full object-cover shadow-luxe"
            />
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <span className="eyebrow">Our Kitchen Standard</span>
            <h2 className="text-3xl md:text-4xl font-serif leading-tight">
              Only Pure, Honest Ingredients
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              In our kitchen, quality starts with what goes into the kadai. We use pure ghee, fresh
              milk, premium semolina, roasted lentils, juicy carrots, and an abundance of cashews,
              almonds and raisins.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We never use artificial food coloring, unnecessary chemical preservatives, or synthetic
              flavor enhancers. When you open a Gold Taste box, you taste genuine homemade halwa
              prepared with honest affection.
            </p>
            <div className="flex items-center gap-6 pt-2">
              <div>
                <span className="block text-2xl font-serif text-gold">100%</span>
                <span className="text-xs text-muted-foreground">Vegetarian Sweets</span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <span className="block text-2xl font-serif text-gold">Fresh</span>
                <span className="text-xs text-muted-foreground">Made on Order</span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <span className="block text-2xl font-serif text-gold">Malda</span>
                <span className="text-xs text-muted-foreground">Local Home Kitchen</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packaging & Gifting */}
      <section className="border-t border-border bg-charcoal">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <span className="eyebrow">Presentation & Gifting</span>
              <h2 className="text-3xl md:text-4xl font-serif">A Box That Feels Like a Celebration</h2>
              <p className="text-muted-foreground leading-relaxed">
                Whether you are treating your family after dinner or sending sweets to friends and
                relatives across Malda, our packaging reflects the love inside. Sealed tightly for
                freshness and presented in luxury black and gold gift-ready boxes.
              </p>
              <Link
                to="/delivery"
                className="inline-flex rounded-full border border-gold px-6 py-3 text-sm font-semibold text-gold hover:bg-gold/10 transition-colors"
              >
                Learn About Delivery & Packing
              </Link>
            </div>

            <div>
              <img
                src={packagingImage}
                alt="Gold Taste packaging"
                className="luxe-card aspect-4/3 w-full object-cover shadow-luxe"
              />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
