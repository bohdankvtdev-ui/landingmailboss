import type { ReactNode } from "react";
import { Anchor } from "@/components/ui/anchor";
import { cn } from "@/lib/cn";

type PremiumPushLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
};

export function PremiumPushLink({
  href,
  children,
  className,
  onNavigate,
}: PremiumPushLinkProps) {
  return (
    <Anchor
      href={href}
      className={cn("button-82-pushable", className)}
      onNavigate={onNavigate}
    >
      <span className="button-82-shadow" aria-hidden="true" />
      <span className="button-82-edge" aria-hidden="true" />
      <span className="button-82-front">{children}</span>
    </Anchor>
  );
}
