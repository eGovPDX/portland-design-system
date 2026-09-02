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

export type TextInputType =
  | "text"
  | "email"
  | "password"
  | "search"
  | "tel"
  | "url";

export type NumberInputType = "number" | "range";

export interface InputProps<T extends InputType = InputType> {
  type: T;
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