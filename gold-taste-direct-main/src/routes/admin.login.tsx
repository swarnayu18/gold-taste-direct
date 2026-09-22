import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, KeyRound, Lock, Mail, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BRAND, logoImage } from "@/lib/brand";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login | Gold Taste Malda" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    // Check if already signed in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate({ to: "/admin" });
      }
    });
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Please enter email and password.");
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
        });
        if (error) throw error;
        toast.success(
          data.session
            ? "Admin account created successfully!"
            : "Sign up successful! Please check your email for confirmation.",
        );
        if (data.session) {
          navigate({ to: "/admin" });
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });
        if (error) throw error;
        toast.success("Welcome back to Gold Taste Admin");
        navigate({ to: "/admin" });
      }
    } catch (err: unknown) {
      console.error("Auth error:", err);
      const msg = err instanceof Error ? err.message : "Authentication failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Demo / Dev Quick Access for testing
  const handleDevBypass = () => {
    sessionStorage.setItem("goldtaste_admin_preview", "true");
    toast.success("Entered Admin Dashboard in preview/test mode");
    navigate({ to: "/admin" });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand Logo & Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <img src={logoImage} alt={BRAND.name} className="h-16 w-auto mx-auto" />
          </Link>
          <h1 className="mt-4 text-3xl font-serif text-foreground">Admin Portal</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Sign in to manage orders, products, UPI settings and store content.
          </p>
        </div>

        {/* Login Card */}
        <div className="luxe-card p-6 md:p-8 space-y-6">
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground font-medium">
                Admin Email
              </label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  placeholder="owner@goldtaste.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-border bg-charcoal pl-10 pr-4 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground font-medium">
                Password
              </label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-border bg-charcoal pl-10 pr-4 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <KeyRound className="h-4 w-4" />
              {loading ? "Verifying..." : isSignUp ? "Create Admin Account" : "Sign In to Dashboard"}
            </button>
          </form>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="hover:text-gold underline"
            >
              {isSignUp ? "Already registered? Sign In" : "Need to register initial admin?"}
            </button>
            <Link to="/" className="hover:text-gold flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Storefront
            </Link>
          </div>

          <div className="hairline-gold my-4" />

          {/* Dev / Preview Mode Bypass for review and local testing */}
          <div className="rounded-xl border border-gold/30 bg-gold/5 p-3.5 text-center">
            <p className="text-xs text-muted-foreground mb-2 flex items-center justify-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-gold" /> Tester / Reviewer Quick Access
            </p>
            <button
              type="button"
              onClick={handleDevBypass}
              className="w-full rounded-full border border-gold/50 bg-card py-2 text-xs font-semibold text-gold hover:bg-gold/10 transition-colors"
            >
              Open Dashboard in Test/Preview Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
