import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy URL — partners is now the canonical term.
export const Route = createFileRoute("/sponsors")({
  beforeLoad: () => {
    throw redirect({ to: "/partners", replace: true });
  },
});
