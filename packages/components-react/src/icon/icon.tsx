import type { IconProps } from "@cityofportland/types/icon";
import React from "react";

import "@cityofportland/components-css/icon.css";

export interface ReactIconProps extends IconProps {
  className?: string;
}

/**
 * Build the class list for the CitySeal component
 */
function buildClassList({
  className = "",
  size,
}: Partial<ReactIconProps>): string {
  const classes: Set<string> = new Set(["icon"]);

  // Size variation
  if (size) classes.add(`icon--${size}`);

  // Custom classes
  if (className) {
    className.split(" ").forEach((c) => classes.add(c));
  }

  return Array.from(classes).join(" ");
}

export const Icon: React.FC<ReactIconProps> = ({
  className,
  icon,
  size,
  ...rest
}) => {
  const classList = buildClassList({
    className,
    size,
  });

  return (
    <svg
      viewBox={`0 0 ${icon.width} ${icon.height}`}
      className={classList}
      {...rest}
    >
      {icon.paths.map((p) => (
        <path {...p} />
      ))}
    </svg>
  );
};
