import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How MAIL BOSS: Survival handles information on this site and in the app.",
};

export default function PrivacyPage() {
  return (
    <Legal
      title="Privacy"
      lede="MAIL BOSS: Survival is a game you play on your device. This page covers the app and this website."
    >
      <h2>The game</h2>
      <p>
        The app does not ask you to create an account. Office money, the inbox, and saved shifts stay on the device. The game does not include a sign-in, and this build does not send analytics.
      </p>
      <h2>This website</h2>
      <p>
        The site is a static landing page. It does not set tracking cookies, and it does not run advertising. Store buttons leave this site for Apple or Google.
      </p>
      <h2>Purchases</h2>
      <p>
        If a store listing adds a purchase later, Apple or Google handles that payment. This website does not take card numbers. The Northline card in the game is office money, not a real card.
      </p>
      <p>Last updated September 28, 2026.</p>
    </Legal>
  );
}

function Legal({ title, lede, children }: { title: string; lede: string; children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-2xl px-5 pt-32 pb-24">
      <p className="font-mono text-[11px] tracking-[0.22em] text-signal uppercase">Mail Boss</p>
      <h1 className="display mt-4 text-5xl text-paper">{title}</h1>
      <p className="mt-5 text-lg leading-8 text-paper/70">{lede}</p>
      <div className="legal mt-10 space-y-4 text-base leading-7 text-paper/80 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-paper">
        {children}
      </div>
    </main>
  );
}
