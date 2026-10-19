"use client";

import { Menu, SkullIcon, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Wrapper } from "../wrapper";
import { NavigationDesktop } from "./navigation-desktop";
import { NavigationMobile } from "./navigation-mobile";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleOpenMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  return (
    <header className="bg-bg px-4 py-4.5 border-b border-border">
      <Wrapper className="justify-between">
        <div className="flex items-center gap-3">
          <Link href="/characters" className="rounded-md bg-primary p-1">
            <SkullIcon className="text-text" size={26} />
          </Link>

          <Link href="/characters">
            <h1 className="text-xl font-bold text-text">
              ONE PIECE <span className="text-primary">WIKI</span>
            </h1>
          </Link>
        </div>

        <button
          type="button"
          onClick={handleOpenMenu}
          aria-expanded={isMenuOpen}
          className="md:hidden rounded-lg border border-border p-2 text-text-muted transition-all duration-200 hover:text-text"
        >
          {isMenuOpen ? (
            <X size={21} strokeWidth={1.8} />
          ) : (
            <Menu size={21} strokeWidth={1.8} />
          )}
        </button>

        <NavigationDesktop />
      </Wrapper>
      <NavigationMobile open={isMenuOpen} />
    </header>
  );
};
