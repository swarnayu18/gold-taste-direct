import { createFileRoute } from "@tanstack/react-router";
import { Image as ImageIcon, X, ZoomIn } from "lucide-react";
import { useState } from "react";
import { PageHeader, SiteLayout } from "@/components/site/SiteLayout";
import { defaultGallery } from "@/lib/brand";
import { useGallery } from "@/lib/shop";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Gold Taste Malda" },
      {
        name: "description",
        content:
          "Explore photographs of Gold Taste halwa, our traditional preparation, fresh ingredients and premium packaging in Malda.",
      },
      { property: "og:title", content: "Gallery | Gold Taste Malda" },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { data: dbGallery, isLoading } = useGallery();
  const [activeImage, setActiveImage] = useState<{ image_url: string; caption?: string } | null>(
    null,
  );

  const images =
    dbGallery && dbGallery.length > 0
      ? dbGallery
      : defaultGallery.map((g, idx) => ({ id: `default-${idx}`, ...g }));

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Visual Journey"
        title="From Our Kitchen"
        subtitle="A look into our slow-cooked halwa, pure ingredients, and handcrafted boxes."
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
        {isLoading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="luxe-card aspect-square animate-pulse" />
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 md:gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              onClick={() => setActiveImage(img)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-charcoal transition-all hover:border-gold/60 hover:shadow-gold"
            >
              <img
                src={img.image_url}
                alt={img.caption || "Gold Taste Halwa"}
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
                <span className="text-xs font-medium text-gold flex items-center gap-1.5 mb-1">
                  <ZoomIn className="h-3.5 w-3.5" /> View Photo
                </span>
                {img.caption && (
                  <p className="text-xs text-foreground/90 font-medium line-clamp-2">
                    {img.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md p-4"
            onClick={() => setActiveImage(null)}
          >
            <div
              className="relative max-w-3xl w-full rounded-3xl border border-gold/40 bg-card p-3 shadow-luxe overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                className="absolute top-5 right-5 z-10 rounded-full bg-background/80 p-2 text-foreground hover:text-gold border border-border"
                aria-label="Close image preview"
              >
                <X className="h-5 w-5" />
              </button>

              <img
                src={activeImage.image_url}
                alt={activeImage.caption || "Gold Taste halwa"}
                className="max-h-[75vh] w-full rounded-2xl object-contain bg-black/40"
              />

              {activeImage.caption && (
                <div className="p-4 text-center">
                  <p className="text-sm font-medium text-foreground">{activeImage.caption}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
