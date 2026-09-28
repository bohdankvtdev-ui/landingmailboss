"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Anchor } from "@/components/ui/anchor";
import { NAV, SITE } from "@/content/site";
import { cn } from "@/lib/cn";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useGSAP(() => {
    const trigger = ScrollTrigger.create({
      start: 16,
      end: 99999,
      onToggle: (self) => setScrolled(self.isActive),
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
    return () => lenis.start();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled || open ? "bg-[#100e0c]/88 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/#play" className="flex items-center gap-2.5 text-paper" onClick={() => setOpen(false)}>
          <Mark />
          <span className="text-sm font-semibold tracking-tight">{SITE.shortName}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Anchor
              key={item.href}
              href={item.href}
              className="text-sm text-paper/70 transition-colors hover:text-paper"
            >
              {item.label}
            </Anchor>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Anchor
            href="/#download"
            className="hidden h-9 items-center rounded-full bg-signal px-4 text-sm font-medium text-white transition-colors hover:bg-signal-dark sm:inline-flex"
          >
            Download
          </Anchor>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-paper md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn("border-t border-white/10 md:hidden", open ? "block" : "hidden")}
      >
        <nav className="flex flex-col px-5 py-4" aria-label="Mobile">
          {NAV.map((item) => (
            <Anchor
              key={item.href}
              href={item.href}
              className="block border-b border-white/10 py-3 text-base text-paper"
              onNavigate={() => setOpen(false)}
            >
              {item.label}
            </Anchor>
          ))}
          <Anchor
            href="/#download"
            className="mt-4 inline-flex h-11 items-center justify-center rounded-full bg-signal text-sm font-medium text-white"
            onNavigate={() => setOpen(false)}
          >
            Download
          </Anchor>
        </nav>
      </div>
    </header>
  );
}

function Mark() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="#D93025" />
      <path d="M7 11.5h18v11H7v-11Z" stroke="#fff" strokeWidth="1.6" fill="none" />
      <path d="M7 11.5 16 19l9-7.5" stroke="#fff" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      {open ? (
        <path d="M3.5 3.5 12.5 12.5M12.5 3.5 3.5 12.5" stroke="currentColor" strokeWidth="1.5" />
      ) : (
        <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" stroke="currentColor" strokeWidth="1.5" />
      )}
    </svg>
  );
}
