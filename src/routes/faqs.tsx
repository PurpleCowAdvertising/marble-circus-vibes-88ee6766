import { createFileRoute, Link } from "@tanstack/react-router";

import { ParkRideInfo } from "@/components/site/ParkRideInfo";
import { FadeIn, PageHero, Section } from "@/components/site/Section";
import { PageGate, VisibilityGate } from "@/components/site/visibility";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs | Scorpion Kings Live" },
      {
        name: "description",
        content:
          "Everything you need to know about Scorpion Kings Live at FNB Stadium: gates, transport, tickets, policies and more.",
      },
      { property: "og:title", content: "FAQs | Scorpion Kings Live" },
      {
        property: "og:description",
        content: "Transport and fan guide for Scorpion Kings Live.",
      },
    ],
  }),
  component: FaqsPage,
});

const CATEGORIES = [
  {
    title: "Gates & Times",
    items: [
      {
        q: "What time do gates open?",
        a: "Gates open at 12pm.",
      },
      {
        q: "Entry times?",
        a: "Gates open 12pm – NO ENTRY WILL BE ALLOWED FROM 9pm onwards.",
      },
      {
        q: "What time does the show start?",
        a: "Pre-show starts 13:00pm – 18:30pm. Main show starts 19:00pm and ends 22:30pm.",
      },
    ],
  },
  {
    title: "Tickets",
    items: [
      {
        q: "Are tickets still available?",
        a: "Tickets are exclusively available through official channels. DO NOT BUY TICKETS THROUGH THIRD PARTIES OR VIAGOGO.",
      },
      {
        q: "Are tickets sold at the gate?",
        a: "No tickets will be sold at the venue. Tickets are only available via Webtickets.",
      },
      {
        q: "Is there parking available?",
        a: "Parking Tickets are available on Webtickets.",
      },
    ],
  },
  {
    title: "Travel & Parking",
    items: [
      {
        q: "Preferred transport?",
        a: "Please use our Park & Ride services available on Webtickets. Gautrain services will also be available.",
      },
      {
        q: "How much is parking?",
        a: "Parking Ext 1/2, 5/6 and 7/8 are R220 each. Premium Parking is R300.",
      },
    ],
  },
  {
    title: "Venue & Experience",
    items: [
      {
        q: "Is the event CASHLESS or CASH?",
        a: "All formal vendors will be cashless. Informal vendors will accept both CASH or CASHLESS.",
      },
      {
        q: "What can I bring or can't bring?",
        a: "Only bring your TICKETS, Cash or Bank Cards.",
      },
      {
        q: "Is Merch going to be sold at the venue?",
        a: "Yes, SK Live Merch will be available for sale.",
      },
      {
        q: "Is the venue wheelchair friendly?",
        a: "All entry points and gates into the stadium are wheelchair friendly.",
      },
    ],
  },
] as const;

function FaqsPage() {
  return (
    <PageGate keyName="page:faqs">
      <PageHero
        eyebrow="FAQs"
        title="Know before you go."
        description="Parking prices, gate info and quick answers to the questions fans ask most."
      />

      <Section className="!pt-4 bg-black text-white">
        <VisibilityGate keyName="section:faqs.parkride">
          <FadeIn>
            <ParkRideInfo />
          </FadeIn>
        </VisibilityGate>

        <VisibilityGate keyName="section:faqs.categories">
          <div className="mt-4 grid gap-12 md:grid-cols-[1fr_2fr] md:gap-16">
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
        </VisibilityGate>

        <VisibilityGate keyName="section:faqs.cta">
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
        </VisibilityGate>
      </Section>
    </PageGate>
  );
}
