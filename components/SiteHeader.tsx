"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Services", href: "/#services" },
  { label: "Our work", href: "/#gallery" },
  { label: "About", href: "/#about" },
  { label: "Visit", href: "/#visit" },
];

export default function SiteHeader({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`relative z-50 border-b ${
        dark
          ? "border-white/15 bg-[#2b1d17] text-white"
          : "border-[#5c4033]/15 bg-[#fbf8f1]/95 text-[#231b17] backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Helen Friends Hair Salon home">
          <Image
            src="/images/logo.png"
            alt=""
            width={58}
            height={52}
            className="h-[52px] w-[58px] object-cover"
            priority
          />
          <div className="min-w-0 leading-none">
            <span className="display-font block truncate text-[1.08rem] font-bold sm:text-xl">
              Helen Friends
            </span>
            <span
              className={`mt-1 block text-[0.58rem] font-bold uppercase tracking-[0.2em] ${
                dark ? "text-[#c2b280]" : "text-[#5c4033]"
              }`}
            >
              Hair Salon
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm font-semibold transition-colors ${
                dark ? "hover:text-[#c2b280]" : "hover:text-[#5c4033]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <a
            href="tel:+17203155051"
            className={`grid h-11 w-11 place-items-center border transition-colors ${
              dark
                ? "border-white/20 hover:border-[#c2b280] hover:text-[#c2b280]"
                : "border-[#5c4033]/20 hover:border-[#5c4033] hover:text-[#5c4033]"
            }`}
            aria-label="Call Helen Friends Hair Salon"
            title="Call us"
          >
            <Phone size={18} />
          </a>
          <Link
            href="/book"
            className="inline-flex h-11 items-center bg-[#5c4033] px-5 text-sm font-bold text-white transition-colors hover:bg-[#3f2b22]"
          >
            Book appointment
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className={`grid h-11 w-11 place-items-center border sm:hidden ${
            dark ? "border-white/20" : "border-[#5c4033]/20"
          }`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {open && (
        <nav
          className={`absolute left-0 right-0 top-20 grid gap-1 border-b p-5 shadow-xl sm:hidden ${
            dark
              ? "border-white/15 bg-[#2b1d17]"
              : "border-[#5c4033]/15 bg-[#fbf8f1]"
          }`}
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="px-3 py-3 text-sm font-semibold"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/book"
            onClick={() => setOpen(false)}
            className="mt-2 bg-[#5c4033] px-4 py-3 text-center text-sm font-bold text-white"
          >
            Book appointment
          </Link>
        </nav>
      )}
    </header>
  );
}
