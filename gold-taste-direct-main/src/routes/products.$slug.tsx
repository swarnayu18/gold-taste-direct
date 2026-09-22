import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Minus, PackageCheck, Plus, Sparkles, Truck } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { formatINR, productImage } from "@/lib/brand";
import { useCart } from "@/lib/cart";
import { useProduct } from "@/lib/shop";
import type { CartLine } from "@/lib/types";

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => {
    const title = params.slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      meta: [
        { title: `${title} | Gold Taste Malda` },
        {
          name: "description",
          content: `Order ${title} from Gold Taste — freshly prepared premium halwa in Malda with local delivery.`,
        },
        { property: "og:title", content: `${title} | Gold Taste Malda` },
        {
          property: "og:description",
          content: `Order ${title} from Gold Taste — freshly prepared premium halwa in Malda.`,
        },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProduct(slug);
  const { addLine } = useCart();
  const [variantId, setVariantId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const variants = useMemo(
    () => (product?.product_variants ?? []).filter((v) => v.is_active),
    [product],
  );
  const selected = variants.find((v) => v.id === variantId) ?? variants[0];

  if (isLoading) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="luxe-card h-96 animate-pulse" />
        </div>
      </SiteLayout>
    );
  }

  if (isError || !product || !product.is_active) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-4 py-24 text-center">
          <h1 className="text-3xl">This halwa isn't available</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            The item you opened is not on our list right now.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Browse all halwa
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const addToCart = () => {
    if (!product.in_stock) {
      toast.error("This halwa is currently unavailable.");
      return;
    }
    if (!selected) {
      toast.error("Please choose a weight first.");
      return;
    }
    const line: CartLine = {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      weightLabel: selected.weight_label,
      price: Number(selected.price),
      quantity,
      imageUrl: product.image_url,
    };
    addLine(line);
    toast.success(`${product.name} (${selected.weight_label}) added to cart`);
    return true;
  };

  return (
    <SiteLayout>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-2 md:py-16">
        <img
          src={productImage(product.slug, product.image_url)}
          alt={product.name}
          className="luxe-card aspect-square w-full object-cover"
        />

        <div>
          <Link to="/products" className="text-xs tracking-widest text-gold uppercase">
            ← Our Halwa
          </Link>
          <h1 className="mt-3 text-4xl">{product.name}</h1>
          <p className="mt-3 text-muted-foreground">{product.description || product.short_description}</p>

          {product.ingredients && (
            <p className="mt-4 text-sm text-foreground/80">
              <span className="text-gold">Ingredients: </span>
              {product.ingredients}
            </p>
          )}

          <div className="mt-7">
            <p className="eyebrow">Select weight</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {variants.map((v) => {
                const active = selected?.id === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVariantId(v.id)}
                    className={`min-w-28 rounded-2xl border px-5 py-3 text-left transition-colors ${
                      active ? "border-gold bg-gold/10" : "border-border hover:border-gold/60"
                    }`}
                  >
                    <span className="block text-sm">{v.weight_label}</span>
                    <span className="block text-sm text-gold">{formatINR(Number(v.price))}</span>
                  </button>
                );
              })}
              {variants.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Weights and prices are not configured yet.
                </p>
              )}
            </div>
            {product.price_is_placeholder && variants.length > 0 && (
              <p className="mt-2 text-xs text-muted-foreground">
                Placeholder price — the owner can update it in the admin panel.
              </p>
            )}
          </div>

          <div className="mt-7 flex items-center gap-4">
            <p className="eyebrow">Quantity</p>
            <div className="flex items-center gap-1 rounded-full border border-border">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => Math.min(50, q + 1))}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {selected && (
            <p className="mt-5 text-2xl text-gold">{formatINR(Number(selected.price) * quantity)}</p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={addToCart}
              disabled={!product.in_stock}
              className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => {
                if (addToCart()) navigate({ to: "/checkout" });
              }}
              disabled={!product.in_stock}
              className="rounded-full border border-gold px-7 py-3.5 text-sm font-semibold text-gold disabled:opacity-50"
            >
              Buy Now
            </button>
          </div>

          {!product.in_stock && (
            <p className="mt-4 text-sm text-destructive">
              Currently unavailable. Please check back or message us on WhatsApp.
            </p>
          )}

          <ul className="mt-8 grid gap-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-gold" /> Freshly prepared
            </li>
            <li className="flex items-center gap-2">
              <PackageCheck className="h-4 w-4 text-gold" /> Carefully packed
            </li>
            <li className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-gold" /> Delivery available in Malda
            </li>
          </ul>
        </div>
      </div>
    </SiteLayout>
  );
}
