import { createFileRoute } from "@tanstack/react-router";

import { FadeIn, PageHero, Section } from "@/components/site/Section";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use | Scorpion Kings Live" },
      {
        name: "description",
        content: "Terms governing your use of the Scorpion Kings Live website and related event information.",
      },
      { property: "og:title", content: "Terms of Use | Scorpion Kings Live" },
      {
        property: "og:description",
        content: "Terms of use for this website and event information.",
      },
    ],
  }),
  component: TermsPage,
});

const SECTIONS = [
  {
    heading: "1. Acceptance of terms",
    body: "By accessing and using this website, you agree to use it responsibly and in accordance with these Terms of Use. This page is provided for transparency and should be reviewed by the relevant legal team before launch.",
  },
  {
    heading: "2. Website information",
    body: "This website provides information about Scorpion Kings Live, including event updates, tickets, merchandise previews, partner opportunities and related content. Event details may change and should always be confirmed through official channels.",
  },
  {
    heading: "3. Use of content",
    body: "Text, images, logos, graphics, videos and other website content may be owned by or licensed to the event organisers, artists, partners or rights holders. You may view the site for personal, non-commercial use only unless written permission is granted.",
  },
  {
    heading: "4. User submissions",
    body: "Information submitted through contact, subscription or enquiry forms must be accurate and lawful. Submitted information may be used to respond to your enquiry, manage communications and support event-related administration.",
  },
  {
    heading: "5. Tickets and events",
    body: "Ticket purchases are subject to the terms and conditions of the official ticketing partner, venue and event organisers. Refunds, exchanges, entry requirements and age restrictions will be governed by the official ticketing and event terms.",
  },
  {
    heading: "6. Merchandise and third-party services",
    body: "Merchandise, ticketing, payment or external services may be handled by third-party platforms. Their own terms, privacy policies and purchase conditions may apply.",
  },
  {
    heading: "7. Third-party links",
    body: "This website may link to third-party websites, including ticketing platforms, video platforms and social media pages. We are not responsible for the content, security or practices of those external sites.",
  },
  {
    heading: "8. Availability and accuracy",
    body: "We aim to keep website information accurate and up to date, but we do not guarantee that all information will always be complete, current or error-free. Event details may be updated as planning progresses.",
  },
  {
    heading: "9. Limitation of liability",
    body: "To the extent permitted by law, the event organisers and website operators will not be liable for indirect, incidental or consequential losses arising from use of this website or reliance on its content.",
  },
  {
    heading: "10. Governing law",
    body: "These Terms should be interpreted in line with the applicable laws confirmed by the event organisers and legal team. This section should be finalised before launch.",
  },
  {
    heading: "11. Updates to these terms",
    body: "These Terms may be updated from time to time. The latest version will be published on this page.",
  },
  {
    heading: "12. Contact",
    body: "For questions about these Terms, please contact the event team through the Contact page or the official legal contact confirmed by the organisers.",
  },
] as const;

function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Use" description="Last updated: pending final legal review." />

      <Section className="bg-black text-white">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <div className="rounded-3xl border border-gold/30 bg-gold/[0.08] p-6 backdrop-blur-xl md:p-8">
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Legal note</p>

              <p className="mt-3 text-sm leading-relaxed text-white/75 md:text-base">
                This page is written as clear website copy and should be checked by the appointed legal team before the
                site goes live.
              </p>
            </div>
          </FadeIn>

          <div className="mt-10 space-y-6">
            {SECTIONS.map((section, index) => (
              <FadeIn key={section.heading} delay={Math.min(index * 0.03, 0.3)}>
                <article className="rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-xl md:p-8">
                  <h2 className="font-display text-2xl font-bold text-white md:text-3xl">{section.heading}</h2>

                  <p className="mt-3 text-sm leading-relaxed text-white/65 md:text-base">{section.body}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
