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
    <section id="rules" ref={root} className="border-t border-[#E8EAED] bg-white text-ink">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <p className="font-mono text-[11px] tracking-[0.22em] text-signal uppercase">Who wrote it</p>
        <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="display max-w-xl text-5xl leading-[0.95] md:text-6xl">The label is the step.</h2>
          <p className="max-w-sm text-base leading-7 text-[#5F6368]">
            Open a message and read the line under the name. Coworkers such as Sarah Chen, John Okonkwo, and Marcus Webb are waiting on a reply.
          </p>
        </div>

        <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RULES.map((rule) => (
            <li key={rule.name} className="rule-card rounded-2xl border border-[#E8EAED] bg-[#F8F9FA] p-5">
              <h3 className="text-xl font-semibold tracking-tight">{rule.name}</h3>
              <p className="mt-2 text-sm">
                <span className="font-medium text-[#5F6368]">{rule.role}</span>
                <span className="px-1.5 text-[#80868B]">·</span>
                <span className="font-semibold text-ink">{rule.action}</span>
              </p>
              <p className="mt-2 text-sm leading-6 text-[#5F6368]">{rule.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
