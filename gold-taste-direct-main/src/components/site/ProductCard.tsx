import { Link } from "@tanstack/react-router";
import { formatINR, productImage } from "@/lib/brand";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const variants = product.product_variants.filter((v) => v.is_active);
  const from = variants.length ? Math.min(...variants.map((v) => v.price)) : 0;

  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group luxe-card overflow-hidden transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={productImage(product.slug, product.image_url)}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {!product.in_stock && (
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs text-muted-foreground">
            Currently unavailable
          </span>
        )}
        {product.is_featured && product.in_stock && (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-medium text-primary-foreground">
            Featured
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl text-foreground">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {product.short_description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gold">
            {variants.length ? `From ${formatINR(from)}` : "Price on request"}
          </span>
          <span className="text-xs tracking-widest text-muted-foreground uppercase group-hover:text-gold">
            View
          </span>
        </div>
        {product.price_is_placeholder && variants.length > 0 && (
          <p className="mt-2 text-[11px] text-muted-foreground">
            Placeholder price — editable in admin
          </p>
        )}
      </div>
    </Link>
  );
}
