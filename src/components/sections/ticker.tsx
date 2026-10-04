import { TICKER } from "@/content/site";

export function Ticker() {
  const items = [...TICKER, ...TICKER];

  return (
    <section className="overflow-hidden border-y border-[#E8EAED] bg-white text-ink" aria-label="People in the inbox">
      <div className="ticker-track flex w-max py-3">
        {items.map((name, index) => (
          <span key={`${name}-${index}`} className="flex items-center px-4 text-sm font-medium">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#D93025]" aria-hidden="true" />
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
