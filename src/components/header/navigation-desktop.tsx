"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export const NavigationDesktop = () => {
  const pathname = usePathname();

  const navLinks = [
    {
      href: "/characters",
      label: "Personagens",
    },
    {
      href: "/akuma-no-mi",
      label: "Akumas no Mi",
    },
  ];

  return (
    <nav className="hidden md:flex gap-6 text-text-muted">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={twMerge(
              "transition-colors duration-200",
              isActive ? "font-bold text-primary" : "hover:text-text",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
};
