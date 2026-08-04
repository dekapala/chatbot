"use client";

import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/80 text-zinc-400 text-sm py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Col 1: Brand Info */}
        <div className="md:col-span-1 space-y-4">
          <Logo markClassName="h-8 w-8" />
          <p className="text-xs leading-relaxed text-zinc-400">
            La plataforma de chatbots de atención en autoservicio para PyMEs. Sin vendedores, sin demoras y sin letra chica.
          </p>
          <div className="text-xs text-zinc-500">
            © 2026 Easybot SaaS. Todos los derechos reservados.
          </div>
        </div>

        {/* Col 2: Producto */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
            Producto
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="#como-funciona" className="hover:text-white transition-colors">
                Cómo funciona
              </Link>
            </li>
            <li>
              <Link href="#demo" className="hover:text-white transition-colors">
                Simulador en vivo
              </Link>
            </li>
            <li>
              <Link href="#precios" className="hover:text-white transition-colors">
                Planes y Módulos
              </Link>
            </li>
            <li>
              <Link href="#casos-de-uso" className="hover:text-white transition-colors">
                Casos de Éxito
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Canales */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
            Integraciones
          </h4>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-1.5 text-zinc-300">
              <span>💬</span> WhatsApp Cloud API
            </li>
            <li className="flex items-center gap-1.5 text-zinc-300">
              <span>📸</span> Instagram Direct
            </li>
            <li className="flex items-center gap-1.5 text-zinc-300">
              <span>🌐</span> Web Widget Flotante
            </li>
            <li className="flex items-center gap-1.5 text-zinc-300">
              <span>📊</span> Panel Métricas CSAT
            </li>
          </ul>
        </div>

        {/* Col 4: Garantías */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
            Garantía Autoservicio
          </h4>
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
            <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
              ⚡ Prueba Gratis 14 Días
            </span>
            <p className="text-[11px] text-zinc-400 leading-normal">
              Probá todas las funciones sin tarjeta de crédito. Cancelás o escalás en cualquier momento.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
