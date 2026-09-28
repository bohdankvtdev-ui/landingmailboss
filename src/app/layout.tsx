import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { SITE } from "@/content/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MAIL BOSS: Survival",
    template: "%s · MAIL BOSS",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ["Mail Boss", "inbox", "survival game", "office", "App Store"],
};

export const viewport: Viewport = {
  themeColor: "#2a2826",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SmoothScroll>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
          >
            Skip to content
          </a>
          <SiteHeader />
          <div id="content">{children}</div>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
