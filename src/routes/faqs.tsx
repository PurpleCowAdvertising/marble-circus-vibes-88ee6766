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
        q: "What time do the gates open?",
        a: "Gates open at 12:00 PM.",
      },
      {
        q: "What are the entry times?",
        a: "Gates open at 12:00 PM. No entry will be permitted after 9:30 PM.",
      },
      {
        q: "What time does the show start?",
        a: "Pre-show: 1:00 PM to 6:30 PM. Main show: 7:00 PM to 10:30 PM.",
      },
    ],
  },
  {
    title: "Tickets",
    items: [
      {
        q: "Are tickets still available?",
        a: "Tickets are available exclusively through Webtickets. Do not purchase tickets from third parties or Viagogo.",
      },
      {
        q: "Can I buy tickets at the gate?",
        a: "No. Tickets will not be sold at the venue. All tickets must be purchased through Webtickets.",
      },
    ],
  },
  {
    title: "Travel & Parking",
    items: [
      {
        q: "Is parking available?",
        a: "Yes. Please note that no vehicles will be allowed near the venue without a valid parking ticket. Parking tickets are available through Webtickets.",
      },
      {
        q: "How much is parking?",
        a: "Parking Ext 1/2, 5/6 and 7/8 are R220 each. Premium Parking is R300.",
      },
      {
        q: "What is the preferred transport option?",
        a: "We recommend using our Park & Ride services, which are available through Webtickets. Gautrain services will also be available.",
      },
    ],
  },
  {
    title: "Venue & Experience",
    items: [
      {
        q: "Is the event cashless or cash?",
        a: "All formal vendors will be cashless only. Informal vendors will accept both cash and cashless payments.",
      },
      {
        q: "What can I bring, and what is prohibited?",
        a: "Please bring only your ID, ticket(s) and a valid payment method, such as cash or a bank card.",
      },
      {
        q: "Will merchandise be sold at the venue?",
        a: "Yes. SK Live merchandise will be available for purchase at the venue.",
      },
      {
        q: "Is the venue wheelchair-friendly?",
        a: "Yes. All entry points and gates into the stadium are wheelchair friendly.",
      },
      {
        q: "Which gate do I use?",
        a: "Gate M & G – Scorpion Ring & Scorpion Field Standing. Gate J, K & L – all seated tickets. Gate A & C – VIP.",
      },
    ],
  },
  {
    title: "Safety & Security",
    items: [
      {
        q: "Who is handling security at the event?",
        a: "The same security company that successfully managed security operations for the Chris Brown and Travis Scott concerts has been appointed for Scorpion Kings Live, with security capacity doubled for the event.",
      },
      {
        q: "Is the event approved by the authorities?",
        a: [
          "Fully approved by the Joint Operations Committee (JOC).",
          "Comprehensive SAPS and JMPD presence throughout the event.",
          "Full support from FNB Stadium Security teams.",
        ],
      },
      {
        q: "How many marshals will be on site?",
        a: "More than 400 marshals will be deployed and supported by dedicated security personnel.",
      },
      {
        q: "What happens if I need medical assistance?",
        a: "There is an extensive Emergency Medical Services (EMS) deployment to provide on-site medical care and rapid response support.",
      },
      {
        q: "What is the commitment to attendee safety?",
        a: "Our commitment is to ensure a safe, secure, and enjoyable experience for all attendees.",
      },
    ],
  },
] as const;

const NOTES = [
  "No refunds",
  "No outside food and drinks",
  "No drugs / weapons / hubblys",
  "No smoking of marijuana and edibles",
  "No passouts",
  "No entry after 21:30",
  "No under 14's (ID will be required on entry) and must be accompanied by an adult",
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
                        {typeof item.a === "string" ? (
                          item.a
                        ) : (
                          <ul className="grid gap-2">
                            {item.a.map((line) => (
                              <li key={line} className="flex gap-3">
                                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                                {line}
                              </li>
                            ))}
                          </ul>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </FadeIn>
            ))}
          </div>
        </VisibilityGate>

        <VisibilityGate keyName="section:faqs.categories">
          <FadeIn delay={0.15}>
            <div className="mt-12 rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-xl md:p-8">
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Please note</p>

              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {NOTES.map((note) => (
                  <li key={note} className="flex gap-3 text-base leading-relaxed text-white/75">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
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
