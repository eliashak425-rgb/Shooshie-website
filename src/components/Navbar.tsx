"use client";

import { useState } from "react";
import { Menu, X, Github } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-purple-500/20 bg-[#0a0a0b]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link
          href="#"
          className="font-serif text-2xl tracking-tighter text-white transition-colors hover:text-purple-400"
        >
          Eli Isaac
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 text-sm font-medium tracking-wide text-zinc-400 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-purple-400"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://github.com/eliashak425-rgb"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-purple-400"
            aria-label="GitHub"
          >
            <Github strokeWidth={1.5} className="h-5 w-5" />
          </Link>
          <Link
            href="#contact"
            className="ml-4 rounded-md bg-purple-600 px-5 py-2 text-xs uppercase tracking-widest text-white shadow-lg shadow-purple-500/25 transition-all hover:bg-purple-500 hover:shadow-purple-500/40"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-white md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X strokeWidth={1.5} className="h-6 w-6" />
          ) : (
            <Menu strokeWidth={1.5} className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-purple-500/20 bg-[#0a0a0b] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-sm font-medium text-zinc-400">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 transition-colors hover:text-purple-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://github.com/eliashak425-rgb"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-2 transition-colors hover:text-purple-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Github strokeWidth={1.5} className="h-4 w-4" />
              GitHub
            </Link>
            <Link
              href="#contact"
              className="rounded-md bg-purple-600 px-5 py-2 text-center text-xs uppercase tracking-widest text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
