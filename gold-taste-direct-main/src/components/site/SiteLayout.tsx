import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { HELP_MESSAGE, whatsappLink } from "@/lib/brand";

export function WhatsAppHelpLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={whatsappLink(HELP_MESSAGE)}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:text-gold ${className}`}
    >
      <MessageCircle className="h-4 w-4 text-gold" /> Need Help? Chat on WhatsApp
    </a>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pb-24 md:pb-0">{children}</main>
      <Footer />

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex gap-2 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
        <Link
          to="/products"
          className="flex-1 rounded-full bg-gold py-3 text-center text-sm font-semibold text-primary-foreground"
        >
          Order Now
        </Link>
        <a
          href={whatsappLink(HELP_MESSAGE)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-gold py-3 text-sm font-semibold text-gold"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
      </div>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="pattern-ornament border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-14 text-center md:py-20">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-3 text-4xl text-gold-gradient md:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
