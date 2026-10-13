"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Heart,
  Phone,
  Mail,
  MapPin,
  Lock,
  ChevronRight,
} from "lucide-react";

interface HeaderProps {
  siteName?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export default function Header({
  siteName = "ICSE — Instituto Centro Social Elcimar",
  phone = "(22) 2772-0000",
  email = "contato@icse.org.br",
  address = "Lagomar, Macaé — RJ",
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Início", href: "/" },
    { label: "Quem Somos", href: "/quem-somos" },
    { label: "Áreas de Atuação", href: "/areas-de-atuacao" },
    { label: "Projetos", href: "/projetos" },
    { label: "Cursos", href: "/cursos" },
    { label: "Notícias", href: "/noticias" },
    { label: "Transparência", href: "/transparencia" },
    { label: "Contato", href: "/contato" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Barra superior de utilidades e contato */}
      <div className="bg-icse-navy text-slate-200 text-xs py-2 px-4 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-icse-green-500" />
              {address}
            </span>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-icse-orange-500" />
              {email}
            </a>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-icse-blue-400" />
              {phone}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400 font-medium">CNPJ: 97.542.996/0001-07</span>
            <span className="text-slate-500">|</span>
            <Link
              href="/admin/login"
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors py-0.5 px-2 rounded hover:bg-white/10"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Painel Administrativo</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Barra Principal de Navegação */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo e Nome */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-xs border border-slate-100 flex-shrink-0 bg-white p-1">
              <Image
                src="/images/logo-icse.jpg"
                alt="Logo Oficial ICSE - Instituto Centro Social Elcimar"
                width={56}
                height={56}
                className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-icse-blue-900 tracking-tight leading-tight">
                ICSE
              </span>
              <span className="text-xs font-semibold text-slate-600 leading-tight hidden sm:block">
                Instituto Centro Social Elcimar
              </span>
              <span className="text-[10px] text-icse-green-700 font-medium tracking-wide">
                Associação Sem Fins Lucrativos • Lagomar / Macaé
              </span>
            </div>
          </Link>

          {/* Links Desktop */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-icse-blue-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Botão de Ação Destacado */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/seja-voluntario"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-icse-orange-600 hover:bg-icse-orange-500 rounded-lg shadow-xs hover:shadow transition-all duration-200"
            >
              <Heart className="w-4 h-4" />
              <span>Seja Voluntário</span>
            </Link>
            <Link
              href="/seja-parceiro"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-icse-blue-800 bg-icse-blue-50 hover:bg-icse-blue-100 rounded-lg transition-colors"
            >
              <span>Seja Parceiro</span>
            </Link>
          </div>

          {/* Botão Menu Mobile */}
          <div className="flex items-center lg:hidden gap-2">
            <Link
              href="/seja-voluntario"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-icse-orange-600 rounded-md"
            >
              Voluntário
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-icse-blue-700 hover:bg-slate-100 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-icse-blue-500"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile Retrátil */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-lg animate-in fade-in duration-200">
          <div className="px-4 pt-3 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 text-base font-medium text-slate-800 hover:text-icse-blue-700 hover:bg-slate-50 rounded-lg"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            ))}

            <div className="pt-4 mt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
              <Link
                href="/seja-voluntario"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-semibold text-white bg-icse-orange-600 rounded-lg"
              >
                <Heart className="w-4 h-4" />
                <span>Voluntariado</span>
              </Link>
              <Link
                href="/seja-parceiro"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center px-3 py-2.5 text-sm font-semibold text-icse-blue-900 bg-icse-blue-100 rounded-lg"
              >
                <span>Parcerias</span>
              </Link>
            </div>

            <div className="pt-2 text-center">
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1 py-1"
              >
                <Lock className="w-3 h-3 text-amber-500" />
                <span>Acesso Administrativo Restrito</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

