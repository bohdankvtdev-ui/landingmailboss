import Link from "next/link";
import { Anchor } from "@/components/ui/anchor";
import { SITE } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-paper">{SITE.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-paper/55">
            Keep the books. Clear the inbox. Office money starts at $600.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper/70" aria-label="Footer">
          <Anchor href="/#play" className="hover:text-paper">
            Play
          </Anchor>
          <Anchor href="/#rules" className="hover:text-paper">
            Rules
          </Anchor>
          <Link href="/support" className="hover:text-paper">
            Support
          </Link>
          <Link href="/privacy" className="hover:text-paper">
            Privacy
          </Link>
        </nav>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-white/10 px-5 py-5 text-xs text-paper/40 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {SITE.shortName}</p>
        <p>iOS and Android · com.mailboss.survival</p>
      </div>
    </footer>
  );
}
