"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const links = [
  { label: "About Me", href: "/#about" },
  { label: "Get in Touch", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [toursOpen, setToursOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-ink text-white">
      <nav className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-3 sm:px-10 lg:h-[80px] lg:py-0 lg:pl-[58px] lg:pr-[70px]">
        {/* Logo */}
        <a href="/" className="relative block shrink-0">
          <Image
            src="/images/logo.png"
            alt="Sherry's Food Tour"
            width={121}
            height={121}
            priority
            className="h-16 w-16 object-contain sm:h-20 sm:w-20 lg:h-[80px] lg:w-[80px]"
          />
        </a>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-[90px] font-quicksand text-[16px] font-bold lg:flex">
          {/* Tours dropdown */}
          <li className="relative min-w-0">
            <button
              onClick={() => setToursOpen(!toursOpen)}
              className="flex items-center gap-1 transition-opacity hover:opacity-70"
            >
              Tours
              <span>▾</span>
            </button>
            {toursOpen && (
              <div className="absolute top-full mt-2 w-40 rounded-lg bg-black text-white shadow-lg z-50">
                <Link
                  href="/#tours"
                  className="block px-4 py-2 text-left transition-opacity hover:opacity-70"
                  onClick={() => setToursOpen(false)}
                >
                  Food Tour
                </Link>
                <Link
                  href="/day-tour"
                  className="block px-4 py-2 text-left transition-opacity hover:opacity-70"
                  onClick={() => setToursOpen(false)}
                >
                  Day Tour
                </Link>
              </div>
            )}
          </li>
          {links.map((link) => (
            <li key={link.label} className="min-w-0">
              <a
                href={link.href}
                className="block truncate transition-opacity hover:opacity-70"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/booking"
          className="hidden h-[40px] w-[150px] items-center justify-center rounded-[50px] bg-gold font-quicksand text-[16px] font-semibold text-black transition-colors hover:bg-[#ffcd00] lg:flex"
        >
          Book Now
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center lg:hidden"
        >
          <Image src="/images/icon-menu.svg" alt="" width={28} height={28} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-white/10 lg:hidden">
          <ul className="flex flex-col gap-1 px-5 py-4 font-quicksand text-lg font-bold sm:px-10">
            {/* Tours dropdown for mobile */}
            <li key="tours" className="min-w-0">
              <button
                onClick={() => setToursOpen(!toursOpen)}
                className="block w-full text-left py-2 transition-opacity hover:opacity-70"
              >
                Tours {toursOpen ? "▴" : "▾"}
              </button>
              {toursOpen && (
                <div className="ml-4 flex flex-col gap-1">
                  <Link
                    href="/#tours"
                    className="block py-2 transition-opacity hover:opacity-70"
                    onClick={() => {
                      setOpen(false);
                      setToursOpen(false);
                    }}
                  >
                    Food Tour
                  </Link>
                  <Link
                    href="/day-tour"
                    className="block py-2 transition-opacity hover:opacity-70"
                    onClick={() => {
                      setOpen(false);
                      setToursOpen(false);
                    }}
                  >
                    Day Tour
                  </Link>
                </div>
              )}
            </li>
            {links.map((link) => (
              <li key={link.label} className="min-w-0">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block truncate py-2 transition-opacity hover:opacity-70"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/booking"
                onClick={() => setOpen(false)}
                className="flex h-12 w-full max-w-[190px] items-center justify-center rounded-[50px] bg-gold font-quicksand font-semibold text-black"
              >
                Book Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
