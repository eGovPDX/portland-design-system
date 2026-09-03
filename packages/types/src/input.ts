import type { BoxProps } from "./box";

export const INPUT_STATES = ["disabled", "error", "success"] as const;

export type InputState = (typeof INPUT_STATES)[number];

export const INPUT_TYPES = [
  "button",
  "checkbox",
  "color",
  "date",
  "datetime-local",
  "email",
  "file",
  "hidden",
  "image",
  "month",
  "number",
  "password",
  "radio",
  "range",
  "reset",
  "search",
  "submit",
  "tel",
  "text",
  "time",
  "url",
  "week",
] as const;

export type InputType = (typeof INPUT_TYPES)[number];

export const TEXT_INPUT_TYPES = [
  "text",
  "email",
  "password",
  "search",
  "tel",
  "url",
] as const;

export type TextInputType =
  | "text"
  | "email"
  | "password"
  | "search"
  | "tel"
  | "url";

export type NumberInputType = "number" | "range";

export interface InputProps<T extends InputType = InputType>
  extends Omit<BoxProps, "as"> {
  type: T;
  state?: InputState;
  name?: string;
  id?: string;
  value?: string | number;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
}

export interface TextInputProps extends InputProps<TextInputType> {
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

export interface NumberInputProps extends InputProps<NumberInputType> {
  min?: number;
  max?: number;
  step?: number;
}

export type AnyInputProps = TextInputProps | NumberInputProps;
