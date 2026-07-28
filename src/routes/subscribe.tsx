import { createFileRoute } from "@tanstack/react-router";
import { ScorpionKingsForm } from "@/components/ScorpionKingsForm";

export const Route = createFileRoute("/subscribe")({
  head: () => ({
    meta: [
      { title: "Subscribe | Scorpion Kings Live" },
      {
        name: "description",
        content: "Join the Scorpion Kings Live mailing list for exclusive updates.",
      },
      { property: "og:title", content: "Subscribe | Scorpion Kings Live" },
      {
        property: "og:description",
        content: "Join the Scorpion Kings Live mailing list for exclusive updates.",
      },
    ],
  }),
  component: SubscribePage,
});

function SubscribePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative z-10 mx-auto max-w-[1400px] bg-black px-5 pb-8 pt-10 text-white sm:px-6 sm:pb-10 sm:pt-14 md:px-10 md:pb-14 md:pt-20">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold sm:text-xs">Mailing List</p>
        <h1 className="mt-3 font-display text-[clamp(2.25rem,9vw,3.5rem)] font-bold leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
          Join the movement.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg md:text-xl">
          Get first access to lineup drops, ticket waves and exclusive content.
        </p>
      </section>

      <div className="mx-auto max-w-2xl px-6 pb-16 md:px-10 md:pb-24">
        <ScorpionKingsForm />
      </div>
    </div>
  );
}
