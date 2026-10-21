import type { TextInputProps } from "./input";

export const TEXTAREA_AUTO_CAPITALIZE = [
  "characters",
  "none",
  "sentences",
  "words",
] as const;

export type TextAreaAutoCapitalize = (typeof TEXTAREA_AUTO_CAPITALIZE)[number];

export const TEXTAREA_SPELL_CHECK = ["default", "false", "true"] as const;

export type TextAreaSpellCheck = (typeof TEXTAREA_SPELL_CHECK)[number];

export const TEXTAREA_WRAP = ["hard", "soft"] as const;

export type TextAreaWrap = (typeof TEXTAREA_WRAP)[number];

export type TextAreaProps = Omit<TextInputProps, "pattern" | "type"> & {
  autoCapitalize?: TextAreaAutoCapitalize;
  autoCorrect?: boolean;
  characterCount?: boolean;
  cols?: number;
  rows?: number;
  spellCheck?: TextAreaSpellCheck;
  wrap?: TextAreaWrap;
};
