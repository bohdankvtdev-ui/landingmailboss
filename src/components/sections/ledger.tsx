"use client";

import { useRef } from "react";
import { NorthlineCard } from "@/components/ui/northline-card";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const LOSSES = [
  {
    title: "Office money hits $0",
    detail: "Bills and an ignored partner can spend the card down. At $0 the shift ends.",
  },
  {
    title: "100 messages still waiting",
    detail: "Leave the inbox open and the shift ends. A banner shows when too many are waiting.",
  },
  {
    title: "Restart in Office",
    detail: "The Office tab shows the card, the mail speed, this shift, and saved runs. Restart opens Mail again.",
  },
] as const;

export function Ledger() {
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const motion = gsap.matchMedia();

      motion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".office-reveal", {
          autoAlpha: 0,
          y: 28,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 75%",
            once: true,
          },
        });

        gsap.set(".loss-card", { autoAlpha: 0, y: 24 });
        ScrollTrigger.batch(".loss-card", {
          start: "top 88%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.7,
              ease: "power3.out",
              overwrite: true,
            });
          },
        });
      });

      motion.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const node = card.current;
        if (!node) return;

        gsap.set(node, { transformPerspective: 900 });
        const rotateX = gsap.quickTo(node, "rotationX", { duration: 0.5, ease: "power3" });
        const rotateY = gsap.quickTo(node, "rotationY", { duration: 0.5, ease: "power3" });

        const onMove = (event: PointerEvent) => {
          const bounds = node.getBoundingClientRect();
          const px = (event.clientX - bounds.left) / bounds.width - 0.5;
          const py = (event.clientY - bounds.top) / bounds.height - 0.5;
          rotateX(-py * 8);
          rotateY(px * 10);
        };

        const onLeave = () => {
          rotateX(0);
          rotateY(0);
        };

        node.addEventListener("pointermove", onMove);
        node.addEventListener("pointerleave", onLeave);

        return () => {
          node.removeEventListener("pointermove", onMove);
          node.removeEventListener("pointerleave", onLeave);
        };
      });

      return () => motion.revert();
    },
    { scope: root },
  );

  return (
    <section id="office" ref={root} className="border-t border-white/10">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-24 lg:grid-cols-2">
        <div>
          <p className="office-reveal font-mono text-[11px] tracking-[0.22em] text-signal uppercase">Office money</p>
          <h2 className="office-reveal display mt-4 text-5xl leading-[0.95] text-paper md:text-6xl">
            The card starts at $600.
          </h2>
          <div className="office-reveal mt-6 space-y-4 text-base leading-7 text-paper/70">
            <p>
              A correct reply pays. The right archive, a spam report, and some swipes pay too. Archive the wrong mail, skip a needed reply, or mark real mail as spam, and the card drops.
            </p>
            <p>
              Rent hits every 20 seconds once work mail is moving. Other plans join later and cost more. Leave Alex Morgan unanswered and the next message takes $10 for every unanswered mail.
            </p>
            <p>
              The gap starts at 8 seconds and tightens for about four minutes, down toward 1.2 seconds. That pace can end the shift.
            </p>
          </div>
        </div>

        <div className="office-reveal mx-auto w-full max-w-md">
          <NorthlineCard ref={card} />
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-4 px-5 pb-24 md:grid-cols-3">
        {LOSSES.map((item) => (
          <article key={item.title} className="loss-card rounded-3xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-paper">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-paper/65">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
