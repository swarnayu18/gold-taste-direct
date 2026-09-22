import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { useProducts } from "@/lib/shop";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Our Halwa | Gold Taste Malda" },
      {
        name: "description",
        content:
          "Browse Gold Taste halwa — gajar, suji, moong dal, besan, dry fruit and our special halwa, available in 250g, 500g and 1kg boxes.",
      },
      { property: "og:title", content: "Our Halwa | Gold Taste Malda" },
      {
        property: "og:description",
        content: "Freshly prepared premium halwa from Malda, available in 250g, 500g and 1kg boxes.",
      },
    ],
  }),
  component: Products,
});

function Products() {
  const { data, isLoading, isError } = useProducts();

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Our Halwa"
        title="Freshly Prepared Halwa"
        subtitle="Choose your halwa and weight. Every box is cooked after you order and packed with care."
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="luxe-card h-80 animate-pulse" />
            ))}
          </div>
        )}
        {isError && (
          <p className="text-center text-sm text-destructive">
            We couldn't load the menu just now. Please check your connection and try again.
          </p>
        )}
        {!isLoading && !isError && (data ?? []).length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            No halwa is listed yet. Please check back shortly.
          </p>
        )}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(data ?? []).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
