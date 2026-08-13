import type { Metadata } from "next";
import { Manrope, Work_Sans } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  weight: ["700", "800"],
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Talentis Connect",
  description: "Plateforme de gestion du processus de recrutement — Talentis Consult",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${manrope.variable} ${workSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-page text-ink-900 font-sans">{children}</body>
    </html>
  );
}
