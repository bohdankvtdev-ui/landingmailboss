"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { Anchor } from "@/components/ui/anchor";
import { InboxPhone } from "@/components/ui/inbox-phone";
import { StoreBadges } from "@/components/ui/store-badges";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

const MailField = dynamic(
  () => import("@/components/canvas/mail-field").then((mod) => mod.MailField),
  { ssr: false },
);

const LINES = ["Clear the inbox", "before it clears", "you."] as const;

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      const motion = gsap.matchMedia();

      motion.add("(prefers-reduced-motion: no-preference)", () => {
        const kicker = section.querySelector(".hero-kicker");
        let split: SplitText | null = null;
        let cancelled = false;
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

        const playKicker = (instance: SplitText) => {
          timeline.from(
            instance.chars,
            { yPercent: 110, duration: 0.55, stagger: 0.015, ease: "power3.out" },
            0,
          );
        };

        if (kicker && document.fonts.status === "loaded") {
          split = SplitText.create(kicker, { type: "chars", mask: "chars", aria: "auto" });
          playKicker(split);
        } else if (kicker) {
          document.fonts.ready.then(() => {
            if (cancelled || !kicker.isConnected) return;
            split = SplitText.create(kicker, { type: "chars", mask: "chars", aria: "auto" });
            gsap.from(split.chars, {
              yPercent: 110,
              duration: 0.55,
              stagger: 0.015,
              ease: "power3.out",
            });
          });
        }

        gsap.set(".hero-phone", { rotation: -4 });

        timeline
          .from(".hero-line", { yPercent: 110, duration: 1.05, stagger: 0.08, ease: "power4.out" }, 0.08)
          .from(".hero-lead", { autoAlpha: 0, y: 18, duration: 0.7 }, 0.42)
          .from(".hero-actions", { autoAlpha: 0, y: 16, duration: 0.65 }, 0.55)
          .from(".hero-phone", { autoAlpha: 0, y: 56, duration: 1.15, ease: "power4.out" }, 0.2);

        const rows = gsap.utils.toArray<HTMLElement>(".hero-row");
        const marker = section.querySelector(".hero-marker");
        if (marker && rows[0]) {
          const height = rows[0].offsetHeight;
          const scan = gsap.timeline({ repeat: -1, repeatDelay: 0.35 });
          rows.forEach((_, index) => {
            scan.to(marker, { y: index * height, duration: 0.45, ease: "power2.inOut" }, index * 0.95);
          });
        }

        return () => {
          cancelled = true;
          split?.revert();
        };
      });

      motion.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const phone = section.querySelector(".hero-phone");
        if (!phone) return;

        const xTo = gsap.quickTo(phone, "x", { duration: 0.7, ease: "power3" });
        const yTo = gsap.quickTo(phone, "y", { duration: 0.7, ease: "power3" });

        const onMove = (event: MouseEvent) => {
          const bounds = section.getBoundingClientRect();
          const px = (event.clientX - bounds.left) / bounds.width - 0.5;
          const py = (event.clientY - bounds.top) / bounds.height - 0.5;
          xTo(px * 16);
          yTo(py * 10);
        };

        const arm = window.setTimeout(() => {
          section.addEventListener("mousemove", onMove);
        }, 1200);
        return () => {
          window.clearTimeout(arm);
          section.removeEventListener("mousemove", onMove);
        };
      });

      return () => motion.revert();
    },
    { scope: root },
  );

  return (
    <section id="play" ref={root} className="relative isolate overflow-hidden">
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <MailField />

      <div className="relative z-10 mx-auto grid min-h-dvh max-w-6xl items-center gap-14 px-5 pt-28 pb-16 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <p className="hero-kicker font-mono text-[11px] tracking-[0.22em] text-paper/60 uppercase">
            Mail Boss Survival
          </p>
          <h1 className="display mt-5 text-[clamp(3.5rem,8vw,7.4rem)] leading-[0.88] text-paper">
            {LINES.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                <span
                  className="hero-line block"
                  style={index === 1 ? { fontStyle: "italic", color: "#d93025" } : undefined}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p className="hero-lead mt-7 max-w-xl text-lg leading-8 text-paper/72">
            You keep the books for this office. Mail starts on an eight-second gap, then climbs for
            about four minutes. One hundred open messages, or office money at $0, ends the shift.
          </p>

          <div className="hero-actions mt-8">
            <dl className="grid max-w-md grid-cols-3 gap-3">
              <Fact value="$600" label="Starting money" />
              <Fact value="8s" label="Opening gap" />
              <Fact value="100" label="Inbox limit" />
            </dl>
            <StoreBadges className="mt-7" />
            <Anchor
              href="/#shift"
              className="mt-5 inline-flex text-sm text-paper/70 underline decoration-white/25 underline-offset-4 hover:text-paper"
            >
              See how a shift works
            </Anchor>
          </div>
        </div>

        <div className="hero-phone will-pan mx-auto w-full max-w-[340px] lg:col-span-5 lg:max-w-none">
          <InboxPhone mode="list" />
        </div>
      </div>
    </section>
  );
}

function Fact({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t border-white/15 pt-3">
      <dt className="text-[11px] tracking-wide text-paper/50 uppercase">{label}</dt>
      <dd className="display mt-1 text-3xl text-paper">{value}</dd>
    </div>
  );
}
