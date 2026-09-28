"use client";

import { useRef } from "react";
import { RULES } from "@/content/site";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function Rules() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const motion = gsap.matchMedia();

      motion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".rule-card", { autoAlpha: 0, y: 28 });
        ScrollTrigger.batch(".rule-card", {
          start: "top 88%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              stagger: 0.07,
              duration: 0.7,
              ease: "power3.out",
              overwrite: true,
            });
          },
        });
      });

      return () => motion.revert();
    },
    { scope: root },
  );

  return (
    <section id="rules" ref={root} className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <p className="font-mono text-[11px] tracking-[0.22em] text-signal uppercase">Who wrote it</p>
        <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="display max-w-xl text-5xl leading-[0.95] md:text-6xl">Read the sender before you touch a button.</h2>
          <p className="max-w-sm text-base leading-7 text-ink/70">
            Coworkers such as Sarah Chen, John Okonkwo, and Marcus Webb are waiting on a reply. The label on the message tells you the special step.
          </p>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RULES.map((rule, index) => (
            <li key={rule.name} className="rule-card rounded-3xl border border-ink/10 bg-white p-6">
              <p className="font-mono text-[11px] tracking-[0.18em] text-ink/40 uppercase">0{index + 1}</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{rule.name}</h3>
              <p className="mt-1 text-sm text-ink/55">{rule.role}</p>
              <p className="mt-6 text-sm font-semibold text-signal">{rule.action}</p>
              <p className="mt-2 text-sm leading-6 text-ink/70">{rule.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
