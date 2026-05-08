import { createFileRoute } from "@tanstack/react-router";
import { FadeIn, PageHero, Section } from "@/components/site/Section";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Sony Music South Africa" },
      { name: "description", content: "How Sony Music South Africa collects, uses and protects your personal data." },
      { property: "og:title", content: "Privacy Policy — Sony Music SA" },
      { property: "og:description", content: "How we handle your data." },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS = [
  { h: "1. Introduction", p: "This Privacy Policy describes how Sony Music Entertainment Africa (Pty) Ltd (\"Sony Music\", \"we\", \"us\") collects, uses, discloses and protects personal information about visitors to this website. By using this website you agree to the practices described here." },
  { h: "2. Information we collect", p: "We collect information you provide directly (such as your name, email address and any messages submitted via our forms) and information collected automatically through cookies and analytics tools (such as IP address, device type and browsing behaviour)." },
  { h: "3. How we use your information", p: "We use your information to send newsletters and event updates you've subscribed to, respond to enquiries, improve our website and content, and comply with legal obligations." },
  { h: "4. Sharing your information", p: "We do not sell your personal information. We may share data with trusted service providers (e.g. email infrastructure, analytics) under strict confidentiality, and where required by law." },
  { h: "5. Data retention", p: "We retain personal information only for as long as necessary to fulfil the purposes set out in this policy, or as required by applicable law." },
  { h: "6. Your rights", p: "Under the Protection of Personal Information Act (POPIA), you have the right to access, correct or request deletion of your personal information, and to withdraw consent to marketing communications at any time." },
  { h: "7. Cookies", p: "We use cookies to remember preferences and to analyse traffic. You can control cookies via your browser settings — disabling them may affect the functionality of the site." },
  { h: "8. Contact", p: "For privacy enquiries or to exercise your rights, contact us at privacy@sonymusic.co.za." },
  { h: "9. Updates", p: "We may update this policy from time to time. The latest version will always be posted on this page with the effective date below." },
];

function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated: this page contains placeholder copy pending review by the Sony Music legal team."
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
