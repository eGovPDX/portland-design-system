import StyleDictionary from "style-dictionary";
import type { Transform } from "style-dictionary/types";

/**
 * Custom transforms for token processing
 */

export const sizePx: Transform = {
  name: "size/px",
  type: "value",
  filter: (token) => token.$type === "dimension",
  transform: (token) => `${token.$value}px`,
};

export const tailwindFontSize: Transform = {
  name: "tailwind/font/size",
  type: "name",
  filter: (token) => token.$type === "fontSize",
  transform: (token) => {
    return `text-${token.path.slice(-1)}`;
  },
};

export const tailwindFontFamily: Transform = {
  name: "tailwind/font/family",
  type: "name",
  filter: (token) => token.$type === "fontFamily",
  transform: (token) => {
    return `font-${token.path.slice(-1)}`;
  },
};

export const tailwindLineHeight: Transform = {
  name: "tailwind/line-height",
  type: "name",
  filter: (token) => token.attributes?.category === "line-height",
  transform: (token) => {
    return `leading-${token.path.slice(-1)}`;
  },
};

/**
 * Custom transform names for use in platform configurations
 */
export const TRANSFORMS = {
  sizePx: sizePx.name,
  tailwindFontSize: tailwindFontSize.name,
  tailwindFontFamily: tailwindFontFamily.name,
  tailwindLineHeight: tailwindLineHeight.name,
} as const;

/**
 * Register all custom transforms with Style Dictionary
 */
export function registerTransforms(): void {
  [sizePx, tailwindFontSize, tailwindFontFamily, tailwindLineHeight].forEach(
    (transform) => {
      StyleDictionary.registerTransform(transform);
    }
  );
}

export default TRANSFORMS;
