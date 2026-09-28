"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/content/site";

export function StoreBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Badge href={APP_STORE_URL} kicker="Download on the" label="App Store">
        <AppleMark />
      </Badge>
      <Badge href={PLAY_STORE_URL} kicker="Get it on" label="Google Play">
        <PlayMark />
      </Badge>
    </div>
  );
}

function Badge({
  href,
  kicker,
  label,
  children,
}: {
  href: string;
  kicker: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className="inline-flex h-14 min-w-44 items-center gap-3 rounded-xl bg-ink px-4 text-paper ring-1 ring-white/15"
    >
      <span className="text-paper">{children}</span>
      <span className="text-left leading-tight">
        <span className="block text-[10px] tracking-wide text-paper/70">{kicker}</span>
        <span className="block text-[15px] font-semibold">{label}</span>
      </span>
    </motion.a>
  );
}

function AppleMark() {
  return (
    <svg width="18" height="22" viewBox="0 0 18 22" aria-hidden="true" fill="currentColor">
      <path d="M14.7 11.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-.1 2.9-2.3c.7-1 1.2-2.1 1.5-3.2-3.9-1.5-3.8-5.6-2.8-6.2ZM12.2 4.8c.6-.8 1.1-1.9.9-3-1 .1-2.1.6-2.8 1.4-.6.7-1.2 1.8-.9 2.9 1.1.1 2.1-.5 2.8-1.3Z" />
    </svg>
  );
}

function PlayMark() {
  return (
    <svg width="18" height="20" viewBox="0 0 18 20" aria-hidden="true">
      <path d="M1.2 1.4c-.3.3-.5.8-.5 1.4v14.4c0 .6.2 1.1.5 1.4l.1.1 8.1-8.1v-.2L1.3 1.3l-.1.1Z" fill="#4285F4" />
      <path d="m12.2 12.4-2.8-2.8v-.2l2.8-2.8.1.1 3.3 1.9c.9.5.9 1.4 0 1.9l-3.3 1.9-.1-.1Z" fill="#FBBC04" />
      <path d="M12.3 12.3 9.4 9.5 1.2 17.6c.3.3.8.4 1.3.1l9.8-5.4Z" fill="#EA4335" />
      <path d="m12.3 6.7-9.8-5.5c-.5-.3-1-.2-1.3.1L9.4 9.5l2.9-2.8Z" fill="#34A853" />
    </svg>
  );
}
