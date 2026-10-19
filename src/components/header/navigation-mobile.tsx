"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface NavigationMobileProps {
  open: boolean;
}

export const NavigationMobile = ({ open }: NavigationMobileProps) => {
  const pathname = usePathname();

  const navLinks = [
    {
      href: "/characters",
      label: "Personagens",
    },
    {
      href: "/fruits",
      label: "Akuma no Mi",
    },
  ];

  return (
    <nav
      className={twMerge(
        "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
        open ? "max-h-60 opacity-100" : "max-h-0 opacity-0",
      )}
    >
      <div className="flex flex-col gap-1 mt-4 border-t border-border py-4">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={twMerge(
                "rounded-md px-3 py-2.5 text-sm transition-colors duration-200",
                isActive
                  ? "font-bold text-primary bg-primary/10"
                  : "text-text-muted hover:text-text hover:bg-bg-elevated",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
