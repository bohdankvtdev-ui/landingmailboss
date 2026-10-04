import Link from "next/link";
import { Anchor } from "@/components/ui/anchor";
import { SITE } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#E8EAED] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">{SITE.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-[#5F6368]">
            Keep the books. Clear the inbox. Office money starts at $1,000.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#5F6368]" aria-label="Footer">
          <Anchor href="/#play" className="hover:text-ink">
            Play
          </Anchor>
          <Anchor href="/#rules" className="hover:text-ink">
            Rules
          </Anchor>
          <Link href="/support" className="hover:text-ink">
            Support
          </Link>
          <Link href="/privacy" className="hover:text-ink">
            Privacy
          </Link>
        </nav>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-[#E8EAED] px-5 py-5 text-xs text-[#80868B] sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {SITE.shortName}</p>
        <p>iOS and Android · com.mailboss.survival</p>
      </div>
    </footer>
  );
}
