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

export const fontSizeTailwind: Transform = {
  name: "tailwind/font/size",
  type: "name",
  filter: (token) => token.$type === "fontSize",
  transform: (token) => {
    return `text-${token.path.slice(-1)}`;
  },
};

export const fontFamilyTailwind: Transform = {
  name: "tailwind/font/family",
  type: "name",
  filter: (token) => token.$type === "fontFamily",
  transform: (token) => {
    return `font-${token.path.slice(-1)}`;
  },
};

export const lineHeightTailwind: Transform = {
  name: "tailwind/line-height",
  type: "name",
  filter: (token) => token.attributes?.category === "line-height",
  transform: (token) => {
    return `leading-${token.path.slice(-1)}`;
  },
};

export const variantsTailwind: Transform = {
  name: "tailwind/variant/color",
  type: "name",
  filter: (token) =>
    token.$type === "color" && token.attributes?.category !== "color",
  transform: (token) => {
    return `color-${token.path.join("-")}`;
  },
};
/**
 * Custom transform names for use in platform configurations
 */
export const TRANSFORMS = {
  sizePx: sizePx.name,
  tailwindFontSize: fontSizeTailwind.name,
  tailwindFontFamily: fontFamilyTailwind.name,
  tailwindLineHeight: lineHeightTailwind.name,
  tailwindVariantColor: variantsTailwind.name,
} as const;

/**
 * Register all custom transforms with Style Dictionary
 */
export function registerTransforms(): void {
  [
    sizePx,
    fontSizeTailwind,
    fontFamilyTailwind,
    lineHeightTailwind,
    variantsTailwind,
  ].forEach((transform) => {
    StyleDictionary.registerTransform(transform);
  });
}

export default TRANSFORMS;
