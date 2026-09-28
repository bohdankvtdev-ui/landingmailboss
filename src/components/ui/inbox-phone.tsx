import type { ReactNode } from "react";
import type { PhoneAction, ThreadMail } from "@/content/site";
import { LIST_ROWS } from "@/content/site";
import { cn } from "@/lib/cn";

type InboxPhoneProps = {
  className?: string;
  mode: "list" | "thread";
  mail?: ThreadMail;
};

const ACTION_LABEL: Record<PhoneAction, string> = {
  reply: "Reply",
  star: "Star, then reply",
  archive: "Archive",
  spam: "Report spam",
  heart: "Heart",
  file: "Finish file",
};

export function InboxPhone({ className, mode, mail }: InboxPhoneProps) {
  return (
    <div className={cn("relative w-full max-w-[340px]", className)} aria-hidden="true">
      <div className="rounded-[2.5rem] bg-[#1c1b19] p-2.5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
        <div className="relative flex h-[var(--phone-h,580px)] flex-col overflow-hidden rounded-[2rem] bg-white text-[#202124]">
          <div className="flex items-center justify-between px-6 pt-3 text-[11px] font-semibold">
            <span>9:41</span>
            <span className="tracking-wide">LTE</span>
          </div>
          <div className="absolute left-1/2 top-2 h-6 w-24 -translate-x-1/2 rounded-full bg-[#1c1b19]" />

          {mode === "list" ? <InboxList /> : mail ? <Thread mail={mail} /> : null}

          <div className="mt-auto grid grid-cols-2 border-t border-[#E8EAED] px-2 py-2 text-center text-[11px] font-medium">
            <div className="text-[#D93025]">Mail</div>
            <div className="text-[#80868B]">Office</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InboxList() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-end justify-between px-4 pt-6 pb-3">
        <div>
          <p className="text-[11px] font-medium tracking-wide text-[#80868B] uppercase">Inbox</p>
          <p className="text-2xl font-semibold tracking-tight">Mail</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-[#80868B]">Office money</p>
          <p className="text-lg font-semibold text-[#202124]">$600</p>
        </div>
      </div>
      <div className="relative min-h-0 flex-1">
        <div className="hero-marker absolute top-0 left-0 z-10 h-[4.5rem] w-1 bg-[#D93025]" />
        <ul>
          {LIST_ROWS.map((row) => (
            <li
              key={row.name}
              className="hero-row flex h-[4.5rem] items-center gap-3 border-t border-[#E8EAED] px-4"
            >
              <span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[11px] font-semibold"
                style={{ backgroundColor: row.tint }}
              >
                {row.initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-sm font-semibold">{row.name}</span>
                  <span className="shrink-0 text-[10px] text-[#80868B]">{row.role}</span>
                </span>
                <span className="mt-0.5 block truncate text-[13px] text-[#5F6368]">{row.subject}</span>
              </span>
              {row.hot ? <span className="h-2 w-2 shrink-0 rounded-full bg-[#D93025]" /> : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Thread({ mail }: { mail: ThreadMail }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col px-4 pt-7">
      <p className="text-[11px] font-medium tracking-wide text-[#80868B] uppercase">Open message</p>
      <div className="mt-4 flex items-center gap-3">
        <span
          className="grid h-11 w-11 place-items-center rounded-full text-xs font-semibold"
          style={{ backgroundColor: mail.tint }}
        >
          {mail.initials}
        </span>
        <div>
          <p className="text-base font-semibold">{mail.name}</p>
          <p className="text-xs text-[#5F6368]">{mail.role}</p>
        </div>
      </div>
      <h3 className="mt-5 text-[17px] leading-snug font-semibold">{mail.subject}</h3>
      <p className="mt-3 text-sm leading-6 text-[#5F6368]">{mail.body}</p>
      <div className="mt-auto pb-4">
        <ActionBar action={mail.action} />
      </div>
    </div>
  );
}

function ActionBar({ action }: { action: PhoneAction }) {
  const items: { id: PhoneAction; icon: ReactNode }[] = [
    { id: "reply", icon: <ReplyIcon /> },
    { id: "star", icon: <StarIcon /> },
    { id: "archive", icon: <ArchiveIcon /> },
    { id: "spam", icon: <SpamIcon /> },
    { id: "heart", icon: <HeartIcon /> },
    { id: "file", icon: <FileIcon /> },
  ];

  return (
    <div>
      <p className="mb-2 text-[11px] font-medium tracking-wide text-[#D93025] uppercase">
        {ACTION_LABEL[action]}
      </p>
      <div className="grid grid-cols-6 gap-1">
        {items.map((item) => {
          const active = item.id === action;
          return (
            <div
              key={item.id}
              className={cn(
                "grid h-10 place-items-center rounded-xl",
                active ? "bg-[#D93025] text-white" : "bg-[#F8F9FA] text-[#5F6368]",
              )}
            >
              {item.icon}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReplyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M6 4 2.5 7.5 6 11" />
      <path d="M3 7.5h6.2A4.3 4.3 0 0 1 13.5 12" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="m8 1.8 1.7 3.6 3.9.5-2.9 2.7.7 3.9L8 10.6 4.6 12.5l.7-3.9L2.4 5.9l3.9-.5L8 1.8Z" />
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

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 13.2S2.4 9.6 2.4 6.2A2.7 2.7 0 0 1 8 5.2a2.7 2.7 0 0 1 5.6 1c0 3.4-5.6 7-5.6 7Z" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M4.5 2.5h5L12.5 5.5V13.5h-8v-11Z" />
      <path d="M9.5 2.5V5.5H12.5" />
    </svg>
  );
}
