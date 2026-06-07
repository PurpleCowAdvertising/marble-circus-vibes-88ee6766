import { createFileRoute, Link } from "@tanstack/react-router";

import { FadeIn, PageHero, Section } from "@/components/site/Section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs | Scorpion Kings Live" },
      {
        name: "description",
        content: "Everything you need to know about Scorpion Kings Live: tickets, venue, travel, policies and more.",
      },
      { property: "og:title", content: "FAQs | Scorpion Kings Live" },
      {
        property: "og:description",
        content: "Tickets, venue, travel and policies answered.",
      },
    ],
  }),
  component: FaqsPage,
});

const CATEGORIES = [
  {
    title: "Tickets",
    items: [
      {
        q: "When do tickets go on sale?",
        a: "Tickets are available from 05 May 2026 via Webtickets, Pick n Pay and Boxer stores nationwide.",
      },
      {
        q: "How much are tickets?",
        a: "General Access tickets start from R400. VIP and Premium Table pricing will be confirmed through the official ticketing channels.",
      },
      {
        q: "Are there age restrictions?",
        a: "Yes. The event is open to ages 14 and up. Valid ID may be required at entry.",
      },
      {
        q: "Can I get a refund?",
        a: "Ticket refunds, transfers and exchanges are governed by the official ticketing partner’s terms and conditions.",
      },
    ],
  },
  {
    title: "Venue",
    items: [
      {
        q: "Where is the event held?",
        a: "Scorpion Kings Live takes place at FNB Stadium in Johannesburg, South Africa.",
      },
      {
        q: "When is the event?",
        a: "The event is scheduled for 19 September 2026.",
      },
      {
        q: "Is the venue accessible?",
        a: "Accessibility information will be shared closer to the event. For specific access arrangements, please contact the team directly.",
      },
      {
        q: "Will there be food and drinks?",
        a: "Yes. Food, bars and vendor areas are planned for the event. Final vendor details will be confirmed closer to the show.",
      },
    ],
  },
  {
    title: "Travel",
    items: [
      {
        q: "Is parking available?",
        a: "Parking, drop-off and ride-share information will be shared before the event. We recommend checking official updates before travelling.",
      },
      {
        q: "Will there be shuttle options?",
        a: "Transport and shuttle details are still being finalised and will be announced through official channels.",
      },
      {
        q: "Are there hotel partners?",
        a: "Hotel and accommodation partners may be announced closer to the event. Ticket holders and subscribers will receive updates first.",
      },
    ],
  },
  {
    title: "Policies",
    items: [
      {
        q: "What can I bring?",
        a: "A full prohibited-items list will be shared before the event. As a guide, outside food and drinks, weapons and professional camera equipment are usually not permitted.",
      },
      {
        q: "Can I bring a professional camera?",
        a: "Professional cameras, detachable lenses and recording equipment may require prior approval or accreditation.",
      },
      {
        q: "Where can I read the privacy policy?",
        a: "You can read the Privacy Policy on the dedicated Privacy Policy page.",
      },
    ],
  },
] as const;

function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title="Everything you need."
        description="Quick answers to the questions fans ask most. Still stuck? Contact the team."
      />

      <Section className="bg-black text-white">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Fan guide</p>

              <h2 className="mt-3 font-display text-4xl font-bold leading-none text-white md:text-6xl">
                Know before you go.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-white/65 md:text-base">
              Details will be updated as the event gets closer. Always use official channels for the latest ticket,
              venue and access information.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-12 md:grid-cols-[1fr_2fr] md:gap-16">
          {CATEGORIES.map((category, categoryIndex) => (
            <FadeIn key={category.title} delay={categoryIndex * 0.05} className="contents">
              <div className="md:sticky md:top-24 md:self-start">
                <p className="text-xs uppercase tracking-[0.4em] text-gold">
                  {String(categoryIndex + 1).padStart(2, "0")}
                </p>

                <h2 className="mt-2 font-display text-4xl font-bold text-white md:text-5xl">{category.title}</h2>
              </div>

              <Accordion
                type="single"
                collapsible
                className="overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-xl"
              >
                {category.items.map((item, itemIndex) => (
                  <AccordionItem key={item.q} value={`${categoryIndex}-${itemIndex}`} className="border-white/10 px-5">
                    <AccordionTrigger className="py-6 text-left font-display text-xl text-white hover:text-gold hover:no-underline">
                      {item.q}
                    </AccordionTrigger>

                    <AccordionContent className="pb-6 text-base leading-relaxed text-white/65">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.25}>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-xl md:p-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Still need help?</p>

              <h2 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">Send the team a message.</h2>
            </div>

            <Link
              to="/contact"
              className="rounded-full bg-gold px-6 py-3 text-xs font-bold uppercase tracking-widest text-black transition-transform hover:scale-105"
            >
              Contact us
            </Link>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
