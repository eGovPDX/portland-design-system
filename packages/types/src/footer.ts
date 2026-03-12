import type { BoxProps } from "./box";

export type FooterProps = Omit<BoxProps, "as"> & {
  copyrightStart: number;
};
