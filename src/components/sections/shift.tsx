"use client";

import { useRef } from "react";
import { InboxPhone } from "@/components/ui/inbox-phone";
import { SHIFT_STEPS } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";

export function Shift() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const motion = gsap.matchMedia();

      motion.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const copies = gsap.utils.toArray<HTMLElement>(".shift-copy");
        const panels = gsap.utils.toArray<HTMLElement>(".shift-panel");
        if (copies.length < 2 || panels.length !== copies.length) return;

        gsap.set(copies[0], { autoAlpha: 1, y: 0 });
        gsap.set(panels[0], { autoAlpha: 1 });
        gsap.set(copies.slice(1), { autoAlpha: 0, y: 28 });
        gsap.set(panels.slice(1), { autoAlpha: 0 });

        const span = copies.length - 1;
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".shift-desktop",
            start: "top top",
            end: "+=340%",
            pin: true,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        });

        timeline.fromTo(
          ".shift-bar",
          { scaleX: 0 },
          { scaleX: 1, ease: "none", duration: span, transformOrigin: "left center" },
          0,
        );

        for (let index = 1; index < copies.length; index += 1) {
          timeline
            .to(copies[index - 1], { autoAlpha: 0, y: -24, duration: 0.35 }, index - 0.15)
            .to(panels[index - 1], { autoAlpha: 0, duration: 0.3 }, index)
            .to(copies[index], { autoAlpha: 1, y: 0, duration: 0.45 }, index)
            .to(panels[index], { autoAlpha: 1, duration: 0.4 }, index);
        }
      });

      return () => motion.revert();
    },
    { scope: root },
  );

  return (
    <section id="shift" ref={root} className="relative">
      <div className="shift-desktop relative min-h-dvh grid-cols-2 items-center">
        <div className="shift-copy-stack relative px-8 xl:px-16">
          {SHIFT_STEPS.map((step) => (
            <article key={step.id} className="shift-copy max-w-xl">
              <p className="font-mono text-[11px] tracking-[0.22em] text-signal uppercase">
                {step.index} / {step.kicker}
              </p>
              <h2 className="display mt-4 text-5xl leading-[0.95] text-paper xl:text-6xl">{step.title}</h2>
              <p className="mt-5 text-lg leading-8 text-paper/70">{step.body}</p>
            </article>
          ))}
        </div>

        <div className="shift-panel-stack relative">
          {SHIFT_STEPS.map((step) => (
            <div key={step.id} className="shift-panel">
              <InboxPhone mode="thread" mail={step.mail} />
            </div>
          ))}
        </div>

        <div className="absolute inset-x-16 bottom-10 h-px bg-white/15">
          <div className="shift-bar h-full w-full origin-left bg-signal" />
        </div>
      </div>

      <div className="shift-mobile mx-auto max-w-6xl px-5 py-20">
        <p className="font-mono text-[11px] tracking-[0.22em] text-signal uppercase">The shift</p>
        <h2 className="display mt-4 max-w-xl text-5xl leading-[0.95] text-paper">Six ways to finish a message.</h2>
        <div className="mt-14 flex flex-col gap-16">
          {SHIFT_STEPS.map((step) => (
            <article key={step.id}>
              <p className="font-mono text-[11px] tracking-[0.22em] text-paper/45 uppercase">
                {step.index} / {step.kicker}
              </p>
              <h3 className="display mt-3 text-4xl leading-none text-paper">{step.title}</h3>
              <p className="mt-4 max-w-md text-base leading-7 text-paper/70">{step.body}</p>
              <InboxPhone mode="thread" mail={step.mail} className="mx-auto mt-8" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
