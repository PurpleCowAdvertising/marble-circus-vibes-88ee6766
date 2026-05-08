import { createFileRoute } from "@tanstack/react-router";
import { FadeIn, PageHero, Section } from "@/components/site/Section";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Sony Music Africa" },
      { name: "description", content: "Terms governing your use of the Sony Music Africa website and related services." },
      { property: "og:title", content: "Terms of Use — Sony Music Africa" },
      { property: "og:description", content: "Terms of use for our website and services." },
    ],
  }),
  component: TermsPage,
});

const SECTIONS = [
  { h: "1. Acceptance of terms", p: "By accessing this website you agree to be bound by these Terms of Use, all applicable laws, and any additional terms posted on individual pages. If you do not agree, please do not use this site." },
  { h: "2. Use of content", p: "All content — including text, graphics, logos, images, audio and video — is owned by or licensed to Sony Music Africa and protected by copyright and other intellectual property laws. You may view and download content for personal, non-commercial use only." },
  { h: "3. User submissions", p: "Any information you submit through this site (including via contact and subscribe forms) must be accurate and lawful. You grant us a non-exclusive licence to use such submissions to respond to you and improve our services." },
  { h: "4. Tickets & events", p: "Tickets purchased for any Sony Music Africa event are subject to the terms and conditions of the ticketing partner and the event venue. Refund and exchange policies will be communicated at point of sale." },
  { h: "5. Disclaimer", p: "This website is provided on an \"as is\" basis. To the fullest extent permitted by law, Sony Music Africa makes no warranties of any kind regarding the site or its content." },
  { h: "6. Limitation of liability", p: "Sony Music Africa shall not be liable for any indirect, incidental or consequential damages arising from your use of this website, including but not limited to loss of data or profits." },
  { h: "7. Third-party links", p: "This site may contain links to third-party websites. We are not responsible for the content or practices of those sites." },
  { h: "8. Governing law", p: "These Terms are governed by the laws of the Republic of South Africa. Any disputes shall be subject to the exclusive jurisdiction of the South African courts." },
  { h: "9. Changes to terms", p: "We reserve the right to update these Terms at any time. Continued use of the site after changes constitutes your acceptance of the revised Terms." },
  { h: "10. Contact", p: "Questions about these Terms? Email us at legal@sonymusic.co.za." },
];

function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        description="Last updated: this page contains placeholder copy pending review by the Sony Music Africa legal team."
      />

      <Section className="border-t border-border">
        <div className="mx-auto max-w-3xl space-y-10">
          {SECTIONS.map((s, i) => (
            <FadeIn key={s.h} delay={Math.min(i * 0.03, 0.3)}>
              <h2 className="font-display text-2xl font-bold md:text-3xl">{s.h}</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{s.p}</p>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
