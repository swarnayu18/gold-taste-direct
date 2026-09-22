import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { PageHeader, SiteLayout } from "@/components/site/SiteLayout";
import { formatINR, productImage } from "@/lib/brand";
import { useCart } from "@/lib/cart";
import { deliveryFeeFor, useSettings, zoneLabel } from "@/lib/shop";
import type { DeliveryZone } from "@/lib/types";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart | Gold Taste" },
      { name: "description", content: "Review your Gold Taste halwa order before checkout." },
      { property: "og:title", content: "Your Cart | Gold Taste" },
      { property: "og:description", content: "Review your Gold Taste halwa order before checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, subtotal, setQuantity, removeLine } = useCart();
  const { data: settings } = useSettings();
  const [zone, setZone] = useState<DeliveryZone>("malda_town");
  const deliveryFee = deliveryFeeFor(zone, settings?.delivery);
  const minimum = Number(settings?.delivery.minimum_order ?? 0);

  return (
    <SiteLayout>
      <PageHeader eyebrow="Cart" title="Your Order" />
      <section className="mx-auto max-w-5xl px-4 py-12">
        {lines.length === 0 ? (
          <div className="luxe-card p-10 text-center">
            <p className="text-lg">Your cart is empty.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Add a halwa box to get started.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              Browse our halwa
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div className="space-y-4">
              {lines.map((l) => (
                <div
                  key={`${l.slug}-${l.weightLabel}`}
                  className="luxe-card flex gap-4 p-4"
                >
                  <img
                    src={productImage(l.slug, l.imageUrl)}
                    alt={l.name}
                    loading="lazy"
                    className="h-24 w-24 shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg">{l.name}</h3>
                        <p className="text-sm text-muted-foreground">{l.weightLabel}</p>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${l.name}`}
                        onClick={() => removeLine(l.slug, l.weightLabel)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-border">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => setQuantity(l.slug, l.weightLabel, l.quantity - 1)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-7 text-center text-sm">{l.quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => setQuantity(l.slug, l.weightLabel, l.quantity + 1)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-gold">{formatINR(l.price * l.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="luxe-card h-fit p-6">
              <h2 className="text-2xl">Summary</h2>
              <div className="mt-5">
                <p className="eyebrow">Delivery area</p>
                <div className="mt-3 space-y-2">
                  {(["malda_town", "outside_malda"] as DeliveryZone[]).map((z) => (
                    <label key={z} className="flex cursor-pointer items-center gap-3 text-sm">
                      <input
                        type="radio"
                        name="zone"
                        checked={zone === z}
                        onChange={() => setZone(z)}
                        className="accent-[oklch(0.79_0.125_85)]"
                      />
                      {zoneLabel(z)}
                    </label>
                  ))}
                </div>
              </div>
              <dl className="mt-6 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd>{formatINR(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Delivery</dt>
                  <dd>{deliveryFee === 0 ? "Free" : formatINR(deliveryFee)}</dd>
                </div>
                <div className="hairline-gold my-3" />
                <div className="flex justify-between text-lg">
                  <dt>Total</dt>
                  <dd className="text-gold">{formatINR(subtotal + deliveryFee)}</dd>
                </div>
              </dl>
              {minimum > 0 && subtotal < minimum ? (
                <p className="mt-4 text-sm text-destructive">
                  Minimum order is {formatINR(minimum)}. Please add a little more.
                </p>
              ) : (
                <Link
                  to="/checkout"
                  className="mt-6 block rounded-full bg-gold py-3.5 text-center text-sm font-semibold text-primary-foreground"
                >
                  Proceed to Checkout
                </Link>
              )}
              <p className="mt-3 text-xs text-muted-foreground">
                Delivery charge is set by the owner and can be changed in the admin panel.
              </p>
            </aside>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
