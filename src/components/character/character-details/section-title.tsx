import { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
}

export const SectionTitle = ({ children }: SectionTitleProps) => (
  <h2 className="mb-6 text-3xl font-bold text-text">{children}</h2>
);
