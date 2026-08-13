import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Talentis Connect",
  description: "Plateforme de gestion du processus de recrutement — Talentis Consult",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router root layout; next/font/google needs
            a build-time fetch to Google Fonts, unavailable in this environment, so we load it at runtime instead. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Work+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-page text-ink-900 font-sans">{children}</body>
    </html>
  );
}
