import { createFileRoute } from "@tanstack/react-router";

import { FadeIn, PageHero, Section } from "@/components/site/Section";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Scorpion Kings Live" },
      {
        name: "description",
        content: "How Scorpion Kings Live handles personal information submitted through this website.",
      },
      { property: "og:title", content: "Privacy Policy | Scorpion Kings Live" },
      {
        property: "og:description",
        content: "How we handle your data.",
      },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS = [
  {
    heading: "1. Introduction",
    body: "This Privacy Policy explains how personal information submitted through the Scorpion Kings Live website may be collected, used and protected. This page is provided for transparency and should be reviewed by the relevant legal team before launch.",
  },
  {
    heading: "2. Information we may collect",
    body: "We may collect information you provide directly, such as your name, email address, enquiry type and message when you submit a form or contact the team. We may also collect basic technical information such as device type, browser information and website usage data.",
  },
  {
    heading: "3. How information may be used",
    body: "Information may be used to respond to enquiries, manage event communications, share relevant updates, improve the website experience and support event-related administration.",
  },
  {
    heading: "4. Marketing and updates",
    body: "If you subscribe to updates, your contact details may be used to send event news, ticket information, lineup announcements and related communications. You may opt out of marketing communications where applicable.",
  },
  {
    heading: "5. Sharing information",
    body: "Personal information is not sold. Information may be shared with trusted service providers who help operate the website, manage communications, process enquiries or support event delivery, where appropriate safeguards are in place.",
  },
  {
    heading: "6. Data retention",
    body: "Personal information should only be kept for as long as reasonably necessary for the purpose for which it was collected, or as required by applicable law.",
  },
  {
    heading: "7. Your rights",
    body: "Depending on applicable data protection law, including POPIA in South Africa, you may have rights to access, correct or request deletion of your personal information, and to withdraw consent where processing is based on consent.",
  },
  {
    heading: "8. Cookies and analytics",
    body: "This website may use cookies or similar technologies to support functionality, remember preferences and understand website traffic. You can usually manage cookie preferences through your browser settings.",
  },
  {
    heading: "9. Contact",
    body: "For privacy-related enquiries, please contact the event team through the Contact page or the official privacy contact confirmed by the event organisers.",
  },
  {
    heading: "10. Updates",
    body: "This policy may be updated from time to time. The latest version will be published on this page.",
  },
] as const;

function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" description="Last updated: pending final legal review." />

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
