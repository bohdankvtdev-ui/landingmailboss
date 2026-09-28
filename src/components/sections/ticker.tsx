import { TICKER } from "@/content/site";

export function Ticker() {
  const items = [...TICKER, ...TICKER];

  return (
    <section className="overflow-hidden border-y border-white/10 bg-signal text-white" aria-label="People in the inbox">
      <div className="ticker-track flex w-max py-3">
        {items.map((name, index) => (
          <span key={`${name}-${index}`} className="flex items-center px-4 text-sm font-medium tracking-wide">
            {name}
            <span className="ml-4 text-white/50" aria-hidden="true">
              /
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
