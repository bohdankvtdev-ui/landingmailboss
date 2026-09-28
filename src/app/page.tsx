import { Download } from "@/components/sections/download";
import { Hero } from "@/components/sections/hero";
import { Ledger } from "@/components/sections/ledger";
import { Rules } from "@/components/sections/rules";
import { Shift } from "@/components/sections/shift";
import { Ticker } from "@/components/sections/ticker";
import { APP_STORE_URL, PLAY_STORE_URL, SITE } from "@/content/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: SITE.name,
  applicationCategory: "GameApplication",
  operatingSystem: "iOS, Android",
  description: SITE.description,
  installUrl: [APP_STORE_URL, PLAY_STORE_URL],
};

export default function HomePage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Ticker />
      <Shift />
      <Rules />
      <Ledger />
      <Download />
    </main>
  );
}
