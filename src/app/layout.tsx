import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Easybot — Chatbots Autónomos para PyMEs",
  description:
    "Automatizá la atención al cliente de tu PyME con IA y la calidez de un recepcionista real. Configuración en autoservicio 100%.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 relative selection:bg-emerald-500 selection:text-zinc-950">
        <AnimatedBackground />
        <Header />
        <main className="flex-1 relative z-10">{children}</main>
      </body>
    </html>
  );
}
