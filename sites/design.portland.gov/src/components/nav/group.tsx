import { atom } from "nanostores";
import React from "react";

export function NavGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  open?: boolean;
}) {
  return (
    <div className={["flex flex-col", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
