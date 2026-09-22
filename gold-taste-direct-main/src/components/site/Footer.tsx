import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { BRAND, logoImage } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-charcoal">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <img src={logoImage} alt={`${BRAND.name} logo`} className="h-14 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            {BRAND.tagline}. {BRAND.secondaryTagline}
          </p>
        </div>

        <div>
          <h4 className="eyebrow">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { to: "/products", label: "Our Halwa" },
              { to: "/about", label: "About Us" },
              { to: "/delivery", label: "Delivery" },
              { to: "/track", label: "Track Order" },
              { to: "/privacy", label: "Privacy Policy" },
              { to: "/terms", label: "Terms & Conditions" },
              { to: "/admin/login", label: "Admin Portal" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-foreground/75 transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-foreground/75">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {BRAND.address}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-gold" />
              <a href={`tel:${BRAND.phone}`} className="hover:text-gold">
                {BRAND.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${BRAND.email}`} className="hover:text-gold">
                {BRAND.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="hairline-gold" />
      <p className="py-6 text-center text-xs text-muted-foreground">
        © 2026 {BRAND.name}. All rights reserved.
      </p>
    </footer>
  );
}
