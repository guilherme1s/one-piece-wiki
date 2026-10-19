import type { ReactNode } from "react";
import { Card } from "../../card";

interface InfoItemProps {
  label: string;
  value: ReactNode;
}

export function InfoItemCard({ label, value }: InfoItemProps) {
  return (
    <Card.Root>
      <Card.Body>
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-text-dim">
          {label}
        </span>

        <span className="text-sm font-medium text-text">{value}</span>
      </Card.Body>
    </Card.Root>
  );
}
