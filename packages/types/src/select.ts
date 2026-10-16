import type { BoxProps } from "./box";

export const SELECT_STATES = ["disabled", "error"] as const;

export type SelectState = (typeof SELECT_STATES)[number];

export interface SelectProps extends Omit<BoxProps, "as"> {
  id?: string;
  name?: string;
  state?: SelectState;
  required?: boolean;
  disabled?: boolean;
}
