import type { ControlProps } from "./control";

export interface SelectProps extends ControlProps {
  multiple?: boolean;
  placeholder?: string;
  size?: number;
}
