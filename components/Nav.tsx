"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-[rgba(250,250,248,0.9)] backdrop-blur-[12px] border-b border-border z-100 px-8">
      <div className="max-w-[1080px] mx-auto flex justify-between items-center h-[60px]">
        <Link
          href="/"
          className="font-serif font-semibold text-[1.15rem] text-fg no-underline tracking-[-0.01em]"
        >
          Juan Borjas
        </Link>
        <button
          className="md:hidden bg-transparent border-none cursor-pointer p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-[22px] h-[2px] bg-fg my-[5px] transition-all duration-200" />
          <span className="block w-[22px] h-[2px] bg-fg my-[5px] transition-all duration-200" />
          <span className="block w-[22px] h-[2px] bg-fg my-[5px] transition-all duration-200" />
        </button>
        <ul
          className={`list-none gap-8 ${
            open
              ? "flex flex-col absolute top-[60px] left-0 right-0 bg-[rgba(250,250,248,0.97)] backdrop-blur-[12px] px-8 py-6 border-b border-border gap-4"
              : "hidden"
          } md:flex md:static md:flex-row md:bg-transparent md:p-0 md:border-none`}
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="no-underline text-fg-secondary text-[0.875rem] font-medium tracking-[0.01em] transition-colors duration-200 hover:text-fg"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
