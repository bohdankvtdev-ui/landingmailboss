"use client";

import type { MouseEvent, ReactNode } from "react";
import { getLenis } from "@/lib/lenis";

type AnchorProps = {
  href: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
};

const HEADER_OFFSET = -80;

export function Anchor({ href, className, children, onNavigate }: AnchorProps) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();
    const url = new URL(href, window.location.href);
    if (!url.hash || url.pathname !== window.location.pathname) return;

    const node = document.getElementById(url.hash.slice(1));
    const lenis = getLenis();
    if (!node || !lenis) return;

    event.preventDefault();
    lenis.scrollTo(node, { offset: HEADER_OFFSET });
  };

  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
