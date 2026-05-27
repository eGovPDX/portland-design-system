import { Box, type ReactBoxProps } from "@cityofportland/components-react/box";
import {
  Button,
  type ReactButtonProps,
} from "@cityofportland/components-react/button";
import React from "react";

export const AccordionContext = React.createContext<{
  open: boolean;
  toggle: () => void;
} | null>(null);

export function AccordionButton({
  children,
  className,
  ...props
}: ReactButtonProps & React.PropsWithChildren<{ className?: string }>) {
  const ctx = React.useContext(AccordionContext);

  if (!ctx) throw new Error("AccordionButton must be used inside Accordion");

  return (
    <Button
      size="sm"
      outline
      className="ml-auto"
      onClick={ctx.toggle}
      {...props}
    >
      {children || (ctx.open ? "Close" : "Open")}
    </Button>
  );
}

export function AccordionHeader({
  as,
  children,
  button = () => <AccordionButton />,
  className,
  ...props
}: ReactBoxProps &
  React.PropsWithChildren<{
    as?: React.ElementType;
    button?: (open: boolean, toggle: () => void) => React.ReactNode;
  }>) {
  const ctx = React.useContext(AccordionContext);

  if (!ctx) throw new Error("AccordionHeader must be used inside Accordion");

  return (
    <Box
      as={as}
      className={`w-full flex items-center ${className || ""}`}
      {...props}
    >
      {children}
    </Box>
  );
}

export function AccordionContent({
  children,
  className,
  ...props
}: React.PropsWithChildren<{ className?: string }>) {
  const ctx = React.useContext(AccordionContext);

  if (!ctx) throw new Error("AccordionContent must be used inside Accordion");

  return (
    <div
      className={[ctx.open ? "" : "hidden", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

export function Accordion({
  children,
  open: openProp = false,
  onToggle,
  ...props
}: React.PropsWithChildren<{
  open?: boolean;
  onToggle?: (open: boolean) => void;
}>) {
  const [open, setOpen] = React.useState(openProp);

  const toggle = () =>
    setOpen((prev) => {
      const newOpen = !prev;
      onToggle?.(newOpen);
      return newOpen;
    });

  return (
    <div {...props}>
      <AccordionContext.Provider value={{ open, toggle }}>
        {children}
      </AccordionContext.Provider>
    </div>
  );
}
