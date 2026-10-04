import type { InboxRow, OfficeSnap, ThreadMail } from "@/content/site";
import { cn } from "@/lib/cn";
import { NorthlineCard } from "@/components/ui/northline-card";

type InboxPhoneProps = {
  className?: string;
  screen: "inbox" | "thread" | "office";
  rows?: readonly InboxRow[];
  gauge?: number;
  streak?: number;
  mail?: ThreadMail;
  office?: OfficeSnap;
  scan?: boolean;
};

export function InboxPhone({
  className,
  screen,
  rows = [],
  gauge = 0.2,
  streak,
  mail,
  office,
  scan = false,
}: InboxPhoneProps) {
  const tab = screen === "office" ? "office" : "mail";

  return (
    <div className={cn("relative w-full max-w-[340px]", className)} aria-hidden="true">
      <div className="rounded-[2.6rem] bg-[#1f1f1f] p-2.5 shadow-[0_24px_50px_rgba(32,33,36,0.18)] ring-1 ring-black/10">
        <div className="relative flex h-[var(--phone-h,600px)] flex-col overflow-hidden rounded-[2rem] bg-white text-[#202124]">
          <div className="flex items-center justify-between px-6 pt-3 text-[11px] font-semibold">
            <span>9:41</span>
            <span className="text-[10px] tracking-wide text-[#5F6368]">LTE</span>
          </div>
          <div className="absolute top-2 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full bg-[#1f1f1f]" />

          {screen === "inbox" ? (
            <InboxList gauge={gauge} rows={rows} scan={scan} streak={streak} />
          ) : null}
          {screen === "thread" && mail ? <Thread mail={mail} /> : null}
          {screen === "office" && office ? <Office office={office} /> : null}

          <TabBar active={tab} />
        </div>
      </div>
    </div>
  );
}

function InboxList({
  rows,
  gauge,
  streak,
  scan,
}: {
  rows: readonly InboxRow[];
  gauge: number;
  streak?: number;
  scan: boolean;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-[#E8EAED] px-3 py-2">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-[#F4F6F8] text-[#3C4043]">
          <MenuIcon />
        </span>
        <span className="flex items-center gap-1.5">
          {streak && streak >= 2 ? <StreakChip count={streak} /> : null}
          <SpeedGauge value={gauge} />
        </span>
      </div>
      <div className="relative min-h-0 flex-1">
        {scan ? <div className="hero-marker absolute top-0 left-0 z-10 h-[4.65rem] w-1 bg-[#D93025]" /> : null}
        <ul>
          {rows.map((row) => (
            <li
              key={`${row.name}-${row.subject}`}
              className={cn(
                "flex h-[4.65rem] items-center gap-3 border-b border-[#E8EAED] px-3.5",
                scan && "hero-row",
              )}
            >
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[11px] font-semibold"
                style={{ backgroundColor: row.tint, color: row.support ? "#1A73E8" : "#202124" }}
              >
                {row.initials === "♥" ? <HeartAvatar /> : row.initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span
                    className={cn(
                      "flex min-w-0 items-center gap-1 truncate text-[13px]",
                      row.unread ? "font-semibold" : "font-normal text-[#3C4043]",
                      row.support && "text-[#1A73E8]",
                      row.danger && "text-[#D93025]",
                    )}
                  >
                    <span className="truncate">{row.name}</span>
                    {row.support ? <CheckIcon /> : null}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 text-[11px]",
                      row.unread ? "font-semibold text-[#5F6368]" : "text-[#80868B]",
                    )}
                  >
                    {row.time}
                  </span>
                </span>
                <span className={cn("mt-0.5 block truncate text-[12.5px]", row.unread ? "font-semibold" : "text-[#3C4043]")}>
                  {row.subject}
                </span>
                <span className="mt-0.5 flex items-center gap-1.5">
                  {row.needsReply ? <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D93025]" /> : null}
                  <span className="min-w-0 flex-1 truncate text-[12px] text-[#5F6368]">{row.preview}</span>
                  <Star filled={Boolean(row.starred)} />
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Thread({ mail }: { mail: ThreadMail }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-[#E8EAED] px-3 py-2.5 text-[#3C4043]">
        <BackIcon />
        <span className="flex items-center gap-3">
          <ArchiveIcon />
          <Star filled={Boolean(mail.starred)} large />
          <SpamIcon />
        </span>
      </div>
      <div className="px-4 pt-4">
        <div className="flex items-center gap-3">
          <span
            className="grid h-11 w-11 place-items-center rounded-full text-xs font-semibold"
            style={{ backgroundColor: mail.tint }}
          >
            {mail.initials === "♥" ? <HeartAvatar /> : mail.initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold">{mail.name}</p>
            <p className="mt-0.5 truncate text-[12px] text-[#5F6368]">
              {mail.role}
              <span className="px-1 text-[#80868B]">·</span>
              <span className="font-semibold text-[#202124]">{mail.action}</span>
            </p>
          </div>
        </div>
        <h3 className="mt-4 text-[17px] leading-snug font-semibold">{mail.subject}</h3>
        <p className="mt-3 text-sm leading-6 text-[#5F6368]">{mail.body}</p>
      </div>
      <div className="mt-auto px-4 pb-3">
        <div className="flex items-center justify-between rounded-full border border-[#E8EAED] bg-[#F8F9FA] px-4 py-2.5">
          <span className="text-sm text-[#80868B]">Reply</span>
          <span className="rounded-full bg-[#D93025] px-3 py-1 text-[11px] font-semibold text-white">Send</span>
        </div>
      </div>
    </div>
  );
}

function Office({ office }: { office: OfficeSnap }) {
  const tiles = [
    { label: "Correct", value: office.correct, hot: true },
    { label: "Mistakes", value: office.mistakes, hot: false },
    { label: "Received", value: office.received, hot: false },
    { label: "Unanswered", value: office.unanswered, hot: false },
    { label: "Time", value: office.elapsed, hot: false },
  ];

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden bg-[#F8F9FA] px-3 pt-3 pb-3">
      <NorthlineCard balance={office.balance} className="shadow-none" />
      <div>
        <p className="px-1 text-[13px] font-semibold">Mail speed</p>
        <div className="mt-1.5 rounded-2xl border border-[#E8EAED] bg-white px-3.5 py-2.5">
          <p className="text-2xl font-bold tracking-tight">{office.speed}</p>
          <p className="mt-0.5 text-[12px] text-[#5F6368]">{office.speedDetail}</p>
        </div>
      </div>
      <div>
        <p className="px-1 text-[13px] font-semibold">This shift</p>
        <div className="mt-1.5 grid grid-cols-2 gap-1.5">
          {tiles.map((tile) => (
            <div
              key={tile.label}
              className={cn(
                "rounded-2xl border bg-white px-3 py-2",
                tile.hot ? "border-[#F8C4C0] bg-[#FFFBFB]" : "border-[#E8EAED]",
              )}
            >
              <p className="text-[15px] font-bold">{tile.value}</p>
              <p className="text-[11px] font-medium text-[#5F6368]">{tile.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabBar({ active }: { active: "mail" | "office" }) {
  const tabs = [
    { id: "mail" as const, label: "Mail" },
    { id: "office" as const, label: "Office" },
    { id: "settings" as const, label: "Settings" },
  ];

  return (
    <div className="mt-auto grid grid-cols-3 border-t border-[#E8EAED] bg-[#FFFAFA] px-1.5 pt-1.5 pb-2">
      {tabs.map((tab) => {
        const on = tab.id === active;
        return (
          <div key={tab.id} className="flex flex-col items-center gap-0.5">
            <span
              className={cn(
                "grid h-7 w-14 place-items-center rounded-2xl",
                on ? "bg-[#FCE8E6] text-[#D93025]" : "text-[#5F6368]",
              )}
            >
              {tab.id === "mail" ? <MailIcon /> : null}
              {tab.id === "office" ? <OfficeIcon /> : null}
              {tab.id === "settings" ? <PersonIcon /> : null}
            </span>
            <span className={cn("text-[10px] font-medium", on ? "text-[#D93025]" : "text-[#5F6368]")}>
              {tab.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function StreakChip({ count }: { count: number }) {
  return (
    <span className="inline-flex h-7 items-center gap-0.5 rounded-full border border-[#F6D7A8] bg-[#FFF4E5] px-2 text-[12px] font-bold text-[#B06000]">
      <FlameIcon />
      {count}
    </span>
  );
}

function SpeedGauge({ value }: { value: number }) {
  const clamped = Math.min(1, Math.max(0, value));
  const color = clamped >= 0.72 ? "#D93025" : clamped >= 0.4 ? "#E37400" : "#1E8E3E";
  const ticks = Array.from({ length: 9 }, (_, index) => -78 + (156 / 8) * index);
  const angle = -78 + clamped * 156;

  return (
    <svg width="52" height="32" viewBox="0 0 58 36" aria-hidden="true">
      {ticks.map((deg, index) => {
        const rad = (deg * Math.PI) / 180;
        const inner = index % 4 === 0 ? 15 : 18;
        const outer = 24;
        const lit = index / 8 <= clamped + 0.02;
        return (
          <line
            key={deg}
            x1={29 + Math.sin(rad) * inner}
            y1={30 - Math.cos(rad) * inner}
            x2={29 + Math.sin(rad) * outer}
            y2={30 - Math.cos(rad) * outer}
            stroke={lit ? color : "#E4E7EB"}
            strokeWidth={index % 4 === 0 ? 2.1 : 1.4}
            strokeLinecap="round"
          />
        );
      })}
      <line
        x1="29"
        y1="30"
        x2="29"
        y2="12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        transform={`rotate(${angle} 29 30)`}
      />
      <circle cx="29" cy="30" r="2.5" fill={color} />
    </svg>
  );
}

function HeartAvatar() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path fill="#D93025" d="M8 13.2S2.4 9.6 2.4 6.2A2.7 2.7 0 0 1 8 5.2a2.7 2.7 0 0 1 5.6 1c0 3.4-5.6 7-5.6 7Z" />
    </svg>
  );
}

function Star({ filled, large = false }: { filled: boolean; large?: boolean }) {
  const size = large ? 18 : 14;
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
      <path
        d="m8 1.8 1.7 3.6 3.9.5-2.9 2.7.7 3.9L8 10.6 4.6 12.5l.7-3.9L2.4 5.9l3.9-.5L8 1.8Z"
        fill={filled ? "#F4B400" : "none"}
        stroke={filled ? "#F4B400" : "#BDC1C6"}
        strokeWidth="1.2"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 5h12M3 9h12M3 13h12" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
      <path fill="#1A73E8" d="M8 1.2 9.5 2l1.6-.2 1 1.3.9 1.4 1.4.7-.1 1.6.8 1.4-.8 1.4.1 1.6-1.4.7-.9 1.4-1 1.3-1.6-.2L8 14.8 6.5 14l-1.6.2-1-1.3-.9-1.4-1.4-.7.1-1.6L.9 8l.8-1.4-.1-1.6 1.4-.7.9-1.4 1-1.3 1.6.2L8 1.2Z" />
      <path d="M5.2 8.1 7 9.9l3.8-3.9" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true">
      <path fill="#E37400" d="M8.2 1.4c.3 2.2-.4 3.4-1.4 4.4C5.6 4.6 5.2 3.2 5.2 3.2 3.4 4.8 2.4 6.8 2.4 9c0 3 2.4 5.4 5.6 5.4s5.6-2.4 5.6-5.4c0-2.6-1.5-4.4-2.6-5.6-.2 1.5-1.1 2.4-2.8 2.8.8-1.6.9-3.4 0-4.8Z" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M11 4 6 9l5 5" />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M2.5 3.5h11v2h-11v-2ZM3.5 5.5h9V13h-9V5.5Z" />
      <path d="M6.5 8.5h3" />
    </svg>
  );
}

function SpamIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M8 2.2 14 13H2L8 2.2Z" />
      <path d="M8 6.5v3" />
      <path d="M8 11.2h.01" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M2.5 4.5h11v8h-11v-8Z" />
      <path d="M2.5 5 8 9l5.5-4" />
    </svg>
  );
}

function OfficeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3 13.5V3.5h6v10" />
      <path d="M9 6.5h4v7" />
      <path d="M5 6h2M5 8.5h2M5 11h2" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="8" cy="5.5" r="2.2" />
      <path d="M3.5 13.2c.6-2.2 2.3-3.3 4.5-3.3s3.9 1.1 4.5 3.3" />
    </svg>
  );
}
