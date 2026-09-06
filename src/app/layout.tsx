import type { Metadata } from "next";
import { Zilla_Slab, Public_Sans, Noto_Kufi_Arabic, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import { Assistant } from "@/components/assistant";
import { MobileNav } from "@/components/mobile-nav";
import { CompareProvider } from "@/components/compare-context";
import { CompareTray } from "@/components/compare-tray";

/* The record face: a surveyor's slab. Carries score numerals
   at cubit scale and every heading in the almanac. */
const zilla = Zilla_Slab({
  variable: "--font-zilla",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/* The civic register workhorse. Body, tables, controls. */
const publicSans = Public_Sans({
  variable: "--font-public",
  subsets: ["latin"],
  display: "swap",
});

/* Arabic is a first-class script here. Kufi for display,
   Naskh for reading — weight-matched to their Latin partners. */
const kufi = Noto_Kufi_Arabic({
  variable: "--font-kufi",
  subsets: ["arabic"],
  display: "swap",
});

const naskh = Noto_Naskh_Arabic({
  variable: "--font-naskh",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nile Cruise MCP — The Fleet Almanac",
  description:
    "79 Nile cruise vessels, independently audited across seven dimensions. Compare on evidence, not on reviews.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${zilla.variable} ${publicSans.variable} ${kufi.variable} ${naskh.variable} h-full antialiased`}
    >
      {/* pb clears the fixed mobile nav; md:pb-0 releases it on desktop */}
      <body className="min-h-full flex flex-col pb-[4.5rem] md:pb-0">
        <a href="#main" className="skip-link">
          Skip to the register
        </a>
        <CompareProvider>
          {children}
          <CompareTray />
          <MobileNav />
        </CompareProvider>
      </body>
    </html>
  );
}
