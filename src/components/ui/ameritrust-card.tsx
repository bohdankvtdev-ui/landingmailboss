import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type AmeriTrustCardProps = HTMLAttributes<HTMLDivElement> & {
  balance?: string;
};

export const AmeriTrustCard = forwardRef<HTMLDivElement, AmeriTrustCardProps>(function AmeriTrustCard(
  { balance = "$1,000", className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "will-pan relative flex aspect-[1.586/1] flex-col justify-between overflow-hidden rounded-[12px] border border-black bg-[#8E1A2B] px-5 pt-4 pb-3.5 text-[#FFF6EE] shadow-[0_16px_36px_rgba(0,0,0,0.28)]",
        className,
      )}
      {...props}
    >
      <span className="office-card-shine" aria-hidden="true" />
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#FFE4C4]/40" />

      <div className="relative flex items-start justify-between">
        <div className="flex items-center">
          <span className="relative h-8 w-[42px] overflow-hidden rounded-[5px] border border-[#F0D9A0] bg-[#D4B06A]">
            <span className="absolute inset-y-0 left-[32%] w-px bg-[#5C4016]/45" />
            <span className="absolute inset-y-0 left-[68%] w-px bg-[#5C4016]/45" />
            <span className="absolute inset-x-0 top-[36%] h-px bg-[#5C4016]/45" />
            <span className="absolute inset-x-0 top-[68%] h-px bg-[#5C4016]/45" />
          </span>
          <span className="relative ml-2.5 h-5 w-5" aria-hidden="true">
            <span className="absolute bottom-0 left-0 size-1.5 rounded-tr-full border-t border-r border-[#FFF6EE]/70" />
            <span className="absolute bottom-0 left-0 size-2.5 rounded-tr-full border-t border-r border-[#FFF6EE]/70" />
            <span className="absolute bottom-0 left-0 size-[15px] rounded-tr-full border-t-[1.5px] border-r-[1.5px] border-[#FFF6EE]/70" />
            <span className="absolute bottom-0 left-0 size-5 rounded-tr-full border-t-[1.5px] border-r-[1.5px] border-[#FFF6EE]/70" />
          </span>
        </div>
        <p className="text-[11px] font-semibold tracking-[0.14em] text-[#FFF6EE]/85">AMERITRUST</p>
      </div>

      <p className="relative font-mono text-lg tracking-[0.14em] text-[#F7F1E8] [text-shadow:0_1px_0_rgba(40,0,8,0.55)]">
        4821 3094 7760 2218
      </p>

      <div className="relative flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.08em]">OFFICE BOOKS</p>
          <div className="mt-1.5 flex items-center gap-1.5">
            <p className="text-[7px] leading-[8px] tracking-wide text-white/60 uppercase">
              Valid
              <br />
              thru
            </p>
            <p className="text-[13px] tracking-wide">09/28</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[9px] tracking-[0.14em] text-white/55 uppercase">Available</p>
          <p className="text-xl leading-none font-semibold text-white">{balance}</p>
        </div>
      </div>
    </div>
  );
});
