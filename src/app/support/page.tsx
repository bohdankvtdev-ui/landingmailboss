import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support",
  description: "How to finish a shift in MAIL BOSS: Survival.",
};

const STEPS = [
  {
    title: "Reply when someone is waiting",
    detail: "Coworkers and the CEO need an answer. Do not archive that mail.",
  },
  {
    title: "Star the boss and the client",
    detail: "Elena Vasquez and Lisa Hartmann. Tap the star, then reply.",
  },
  {
    title: "Archive receipts",
    detail: "Nexora, Stria, Linquer, Notiva, Calivo, Marazo, and Airelo. A reply usually costs office money.",
  },
  {
    title: "Report spam",
    detail: "Amazing Deal and fake security warnings. Do not reply.",
  },
  {
    title: "Heart personal mail",
    detail: "Your love. Leave it, and a later message takes $4.50 for every unanswered mail, up to $90.00. That rises to $6.00 and $7.50 as the shift goes on.",
  },
  {
    title: "Finish the file",
    detail: "Word, Excel, PDF, and drawings. Close the file, then reply. Finished work pays. Unfinished work is a mistake, and the next work mail arrives as a pair.",
  },
] as const;

export default function SupportPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-5 pt-32 pb-24">
      <p className="font-mono text-[11px] tracking-[0.22em] text-signal uppercase">Support</p>
      <h1 className="display mt-4 text-5xl text-ink">John is in the inbox.</h1>
      <p className="mt-5 text-lg leading-8 text-[#5F6368]">
        The tutorial stays in your inbox. These are the same rules, if you need them before you install.
      </p>
      <ol className="mt-10 space-y-6">
        {STEPS.map((step, index) => (
          <li key={step.title} className="border-t border-[#E8EAED] pt-6">
            <p className="font-mono text-[11px] tracking-[0.18em] text-[#80868B] uppercase">0{index + 1}</p>
            <h2 className="mt-2 text-xl font-semibold text-ink">{step.title}</h2>
            <p className="mt-2 text-base leading-7 text-[#5F6368]">{step.detail}</p>
          </li>
        ))}
      </ol>
      <p className="mt-10 text-base leading-7 text-[#5F6368]">
        The shift ends if the card is empty, or if the inbox collapses at 100 messages. Restart lives in the Office tab. Account holds the website, Support, and Privacy. Log out leaves this phone. Delete Boss Mail removes the address. Store purchases, if the listing adds them, are handled by Apple or Google.
      </p>
      <p className="mt-6">
        <Link href="/#play" className="text-sm text-ink underline decoration-[#E8EAED] underline-offset-4">
          Back to the game
        </Link>
      </p>
    </main>
  );
}
