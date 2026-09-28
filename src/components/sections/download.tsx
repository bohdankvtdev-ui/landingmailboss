"use client";

import { useRef } from "react";
import { StoreBadges } from "@/components/ui/store-badges";
import { gsap, useGSAP } from "@/lib/gsap";

export function Download() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const motion = gsap.matchMedia();
      motion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".download-reveal", {
          autoAlpha: 0,
          y: 24,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            once: true,
          },
        });
      });
      return () => motion.revert();
    },
    { scope: root },
  );

  return (
    <section id="download" ref={root} className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-28">
        <p className="download-reveal font-mono text-[11px] tracking-[0.22em] text-signal uppercase">
          App Store and Google Play
        </p>
        <h2 className="download-reveal display mt-4 max-w-3xl text-6xl leading-[0.9] text-paper md:text-8xl">
          The office is open.
        </h2>
        <p className="download-reveal mt-6 max-w-lg text-lg leading-8 text-paper/70">
          John, your support manager, is already in the inbox. Tell him you are ready, then keep the books.
        </p>
        <div className="download-reveal mt-10">
          <StoreBadges />
        </div>
      </div>
    </section>
  );
}
