import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin sign in" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    // If already signed in, bounce to /admin — admin gate will redirect out
    // if the email is not on the allow-list.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function signIn() {
    setBusy(true);
    setErr(null);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin + "/auth",
      });
      if (result.error) {
        setErr(result.error.message ?? "Sign-in failed.");
        return;
      }
      if (result.redirected) return; // navigating away
      navigate({ to: "/admin", replace: true });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Sign-in failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-sm rounded-3xl border border-white/15 bg-white/[0.05] p-8 backdrop-blur-xl">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">Admin</p>
        <h1 className="mt-3 font-display text-3xl font-bold">Sign in to manage content</h1>
        <p className="mt-3 text-sm text-white/60">
          Access is restricted to authorised admins. Sign in with your Google account below.
        </p>

        <button
          type="button"
          onClick={signIn}
          disabled={busy}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
          </svg>
          {busy ? "Signing in…" : "Sign in with Google"}
        </button>

        {err && <p className="mt-4 text-xs text-red-300">{err}</p>}

        <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-white/40">Not an admin? You’ll be redirected back home.</p>
      </div>
    </div>
  );
}
