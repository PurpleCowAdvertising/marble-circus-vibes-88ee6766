import { createFileRoute } from "@tanstack/react-router";
import { FadeIn, PageHero, Section } from "@/components/site/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — Scorpion Kings" },
      { name: "description", content: "Everything you need to know — tickets, venue, travel, policies and more." },
      { property: "og:title", content: "FAQs — Scorpion Kings" },
      { property: "og:description", content: "Tickets, venue, travel and policies — answered." },
    ],
  }),
  component: FaqsPage,
});

const CATEGORIES = [
  {
    title: "Tickets",
    items: [
      { q: "When do tickets go on sale?", a: "Subscribe to our newsletter to be the first to know about ticket waves and pre-sale access." },
      { q: "Are there age restrictions?", a: "The event is 18+. Valid ID required at entry." },
      { q: "Can I get a refund?", a: "Tickets are non-refundable but transferable. See our refund policy in the Terms of Use." },
    ],
  },
  {
    title: "Venue",
    items: [
      { q: "Where is the event held?", a: "Venue details will be announced closer to the date. Subscribers get the news first." },
      { q: "Is the venue accessible?", a: "Yes — fully accessible facilities and dedicated viewing areas. Contact us for arrangements." },
      { q: "Are there food & drinks?", a: "A wide selection of food trucks, bars and pop-ups will be on site." },
    ],
  },
  {
    title: "Travel & Stay",
    items: [
      { q: "Are there hotel partners?", a: "We're partnering with select hotels — discount codes will be shared with ticket holders." },
      { q: "Is parking available?", a: "Limited on-site parking. We recommend ride-share or shuttles from designated pickup points." },
    ],
  },
  {
    title: "Policies",
    items: [
      { q: "What can I bring?", a: "No outside food, drinks, professional cameras or weapons. A full list is published with your ticket." },
      { q: "What's your privacy policy?", a: "See our Privacy Policy page for full details on how we handle your data." },
    ],
  },
];

function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title="Everything you need."
        description="Quick answers to the questions we get most. Still stuck? Hit us on the contact page."
      />

      <Section className="border-t border-border">
        <div className="grid gap-16 md:grid-cols-[1fr_2fr]">
          {CATEGORIES.map((cat, i) => (
            <FadeIn key={cat.title} delay={i * 0.05} className="contents">
              <div className="md:sticky md:top-24 md:self-start">
                <p className="text-xs uppercase tracking-[0.4em] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">{cat.title}</h2>
              </div>
              <Accordion type="single" collapsible className="border-t border-border">
                {cat.items.map((item, j) => (
                  <AccordionItem key={j} value={`${i}-${j}`} className="border-b border-border">
                    <AccordionTrigger className="py-6 text-left font-display text-xl hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-base text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
