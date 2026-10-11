"use client";

import { useRef } from "react";
import { AmeriTrustCard } from "@/components/ui/ameritrust-card";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const LOSSES = [
  {
    title: "Card empty",
    detail: "Office money hits $0. Bills and an ignored partner can spend the card down.",
  },
  {
    title: "Inbox collapsed",
    detail: "100 messages are still waiting. That is the inbox limit.",
  },
  {
    title: "Restart",
    detail: "The red Restart button in Office ends this loop and opens Mail again.",
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
    <section id="office" ref={root} className="border-t border-[#E8EAED] bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-24 lg:grid-cols-2">
        <div>
          <p className="office-reveal font-mono text-[11px] tracking-[0.22em] text-signal uppercase">Office money</p>
          <h2 className="office-reveal display mt-4 text-5xl leading-[0.95] text-ink md:text-6xl">
            The card starts at $1,000.
          </h2>
          <div className="office-reveal mt-6 space-y-4 text-base leading-7 text-[#5F6368]">
            <p>
              A correct reply pays the most. The right archive, a spam report, and some swipes pay too. Archive the wrong mail, skip a needed reply, or mark real mail as spam, and that message stays. Card charges are listed on the Office tab.
            </p>
            <p>
              Rent is $200, about every 40 seconds once work mail is moving. Reply within 15 seconds and attach a cheque or receipt. Miss it and the card is charged $250. The Office tab lists that charge, and the next note comes in 39 seconds. Your love writes about every 32 seconds. Other plans arrive one at a time, about every 16 seconds. Leave Your love unanswered and a later message takes $4.50 for every unanswered mail, up to $90.00, then rises to $6.00 and $7.50.
            </p>
            <p>
              A clean streak, or a sorted batch of the same kind of mail, pays extra office money.
            </p>
          </div>
        </div>

        <div className="office-reveal mx-auto w-full max-w-md">
          <AmeriTrustCard ref={card} />
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-4 px-5 pb-24 md:grid-cols-3">
        {LOSSES.map((item) => (
          <article key={item.title} className="loss-card rounded-2xl border border-[#E8EAED] bg-[#F8F9FA] p-6">
            <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[#5F6368]">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
