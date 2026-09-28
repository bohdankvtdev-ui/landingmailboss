import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type NorthlineCardProps = HTMLAttributes<HTMLDivElement> & {
  balance?: string;
};

export const NorthlineCard = forwardRef<HTMLDivElement, NorthlineCardProps>(function NorthlineCard(
  { balance = "$600", className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "will-pan relative overflow-hidden rounded-[20px] border border-white/15 bg-[#1A2744] px-6 pt-5 pb-5 text-[#F4F7FB] shadow-[0_24px_50px_rgba(0,0,0,0.35)]",
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute -top-12 -left-8 h-36 w-56 rounded-full bg-white/15" />
      <div className="pointer-events-none absolute -right-10 -bottom-12 h-32 w-44 rounded-full bg-white/10" />

      <div className="relative flex items-start justify-between">
        <div className="flex h-9 w-12 flex-col justify-between rounded-md border border-[#F3E2B0] bg-[#E3C27A] px-1.5 py-1.5">
          <span className="h-0.5 rounded bg-[#A6843E]" />
          <span className="h-0.5 rounded bg-[#A6843E]" />
          <span className="h-0.5 w-2/3 rounded bg-[#A6843E]" />
        </div>
        <div className="text-right">
          <p className="text-[13px] font-bold tracking-[0.16em]">NORTHLINE</p>
          <p className="mt-0.5 text-[11px] text-white/70">Office card</p>
        </div>
      </div>

      <p className="relative mt-8 font-mono text-lg tracking-[0.14em] text-[#F7F4EC]">4821 3094 7760 2218</p>

      <div className="relative mt-6 flex items-end justify-between">
        <div>
          <p className="text-[10px] tracking-[0.14em] text-white/60 uppercase">Cardholder</p>
          <p className="mt-1 text-sm font-semibold">OFFICE BOOKS</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] tracking-[0.14em] text-white/60 uppercase">Available</p>
          <p className="mt-1 text-2xl font-semibold">{balance}</p>
        </div>
      </div>
    </div>
  );
});
