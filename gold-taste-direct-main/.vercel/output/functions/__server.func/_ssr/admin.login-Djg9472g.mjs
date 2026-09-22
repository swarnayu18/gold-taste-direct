import { r as __toESM } from "../_runtime.mjs";
import { d as logoImage, t as BRAND } from "./brand-DAhpdDak.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as KeyRound, E as Mail, O as Lock, W as ArrowLeft, d as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-BFqeEf5p.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.login-Djg9472g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [isSignUp, setIsSignUp] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			if (session) navigate({ to: "/admin" });
		});
	}, [navigate]);
	const handleAuth = async (e) => {
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
					password: password.trim()
				});
				if (error) throw error;
				toast.success(data.session ? "Admin account created successfully!" : "Sign up successful! Please check your email for confirmation.");
				if (data.session) navigate({ to: "/admin" });
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email: email.trim(),
					password: password.trim()
				});
				if (error) throw error;
				toast.success("Welcome back to Gold Taste Admin");
				navigate({ to: "/admin" });
			}
		} catch (err) {
			console.error("Auth error:", err);
			const msg = err instanceof Error ? err.message : "Authentication failed";
			toast.error(msg);
		} finally {
			setLoading(false);
		}
	};
	const handleDevBypass = () => {
		sessionStorage.setItem("goldtaste_admin_preview", "true");
		toast.success("Entered Admin Dashboard in preview/test mode");
		navigate({ to: "/admin" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background flex flex-col justify-center items-center px-4 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: logoImage,
							alt: BRAND.name,
							className: "h-16 w-auto mx-auto"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 text-3xl font-serif text-foreground",
						children: "Admin Portal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Sign in to manage orders, products, UPI settings and store content."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "luxe-card p-6 md:p-8 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleAuth,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs uppercase tracking-wider text-muted-foreground font-medium",
								children: "Admin Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative mt-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									required: true,
									placeholder: "owner@goldtaste.com",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									className: "w-full rounded-xl border border-border bg-charcoal pl-10 pr-4 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs uppercase tracking-wider text-muted-foreground font-medium",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative mt-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									required: true,
									placeholder: "••••••••",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									className: "w-full rounded-xl border border-border bg-charcoal pl-10 pr-4 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: loading,
								className: "w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "h-4 w-4" }), loading ? "Verifying..." : isSignUp ? "Create Admin Account" : "Sign In to Dashboard"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs text-muted-foreground pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setIsSignUp(!isSignUp),
							className: "hover:text-gold underline",
							children: isSignUp ? "Already registered? Sign In" : "Need to register initial admin?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "hover:text-gold flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3 w-3" }), " Storefront"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hairline-gold my-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-gold/30 bg-gold/5 p-3.5 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground mb-2 flex items-center justify-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-gold" }), " Tester / Reviewer Quick Access"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: handleDevBypass,
							className: "w-full rounded-full border border-gold/50 bg-card py-2 text-xs font-semibold text-gold hover:bg-gold/10 transition-colors",
							children: "Open Dashboard in Test/Preview Mode"
						})]
					})
				]
			})]
		})
	});
}
//#endregion
export { AdminLoginPage as component };
