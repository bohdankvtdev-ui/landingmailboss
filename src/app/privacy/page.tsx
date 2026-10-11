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
      <h2>Boss Mail</h2>
      <p>
        The app asks you to create Boss Mail: a nickname, a domain, and a password. The address looks like nickname@bossmail.com. The password is stored as a hash. A session keeps you signed in. Account can log out of this phone, or delete the address.
      </p>
      <h2>The game</h2>
      <p>
        Office money, the inbox, and saved shifts stay on the device. This build does not send analytics.
      </p>
      <h2>This website</h2>
      <p>
        The site is a static landing page. It does not set tracking cookies, and it does not run advertising. Store buttons leave this site for Apple or Google.
      </p>
      <h2>Purchases</h2>
      <p>
        If a store listing adds a purchase later, Apple or Google handles that payment. This website does not take card numbers. The AmeriTrust card in the game is office money, not a real card.
      </p>
      <p>Last updated October 4, 2026.</p>
    </Legal>
  );
}

function Legal({ title, lede, children }: { title: string; lede: string; children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-2xl px-5 pt-32 pb-24">
      <p className="font-mono text-[11px] tracking-[0.22em] text-signal uppercase">Mail Boss</p>
      <h1 className="display mt-4 text-5xl text-ink">{title}</h1>
      <p className="mt-5 text-lg leading-8 text-[#5F6368]">{lede}</p>
      <div className="legal mt-10 space-y-4 text-base leading-7 text-[#3C4043] [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink">
        {children}
      </div>
    </main>
  );
}
