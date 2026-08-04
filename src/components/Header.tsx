"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { Logo } from "./Logo";

export function Header() {
  const { scrollY } = useScroll();
  const [mobileOpen, setMobileOpen] = useState(false);

  const bgOpacity = useTransform(scrollY, [0, 80], [0.4, 0.9]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <motion.div
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
        className="w-full bg-zinc-950/80 border-b border-zinc-800/80 px-6 lg:px-12 py-3.5 flex items-center justify-between shadow-lg"
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Logo markClassName="h-9 w-9 transition-transform group-hover:scale-105" />
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <Link
            href="#como-funciona"
            className="hover:text-white transition-colors"
          >
            Cómo funciona
          </Link>
          <Link
            href="#casos-de-uso"
            className="hover:text-white transition-colors"
          >
            Casos de Uso
          </Link>
          <Link
            href="#demo"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Demo en vivo
          </Link>
          <Link
            href="#precios"
            className="hover:text-white transition-colors"
          >
            Precios
          </Link>
          <Link
            href="#testimonios"
            className="hover:text-white transition-colors"
          >
            Testimonios
          </Link>
        </nav>

        {/* Action CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="#demo"
            className="text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-500/40 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all"
          >
            Plan Gratis Activo
          </Link>
          <Link
            href="#demo"
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-medium rounded-full group bg-gradient-to-br from-indigo-500 to-emerald-400 group-hover:from-indigo-500 group-hover:to-emerald-400 hover:text-white text-white shadow-md shadow-emerald-500/10"
          >
            <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-zinc-950 rounded-full group-hover:bg-opacity-0 font-semibold">
              Probar Gratis sin Tarjeta
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </motion.div>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-zinc-950 border-b border-zinc-800 px-6 py-6 space-y-4 flex flex-col shadow-2xl"
        >
          <Link
            href="#como-funciona"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-medium text-zinc-300 hover:text-white"
          >
            Cómo funciona
          </Link>
          <Link
            href="#casos-de-uso"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-medium text-zinc-300 hover:text-white"
          >
            Casos de Uso
          </Link>
          <Link
            href="#demo"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-medium text-zinc-300 hover:text-white flex items-center gap-2"
          >
            <span>🤖</span> Demo en vivo
          </Link>
          <Link
            href="#precios"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-medium text-zinc-300 hover:text-white"
          >
            Precios
          </Link>
          <Link
            href="#testimonios"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-medium text-zinc-300 hover:text-white"
          >
            Testimonios
          </Link>
          <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
            <Link
              href="#demo"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-2.5 rounded-full bg-emerald-600 font-semibold text-sm text-white"
            >
              Probar Gratis
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
