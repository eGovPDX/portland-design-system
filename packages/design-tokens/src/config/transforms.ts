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

export const tailwindColorBackground: Transform = {
  name: "tailwind/color/background",
  type: "name",
  filter: (token) => token.$type === "color" && token.attributes?.category === "background",
  transform: (token) => {
    return `background-color-${token.path.slice(1).join("-")}`;
  },
};

export const tailwindColorBorder: Transform = {
  name: "tailwind/color/border",
  type: "name",
  filter: (token) => token.$type === "color" && token.attributes?.category === "border",
  transform: (token) => {
    return `border-color-${token.path.slice(1).join("-")}`;
  },
};

export const tailwindColorText: Transform = {
  name: "tailwind/color/text",
  type: "name",
  filter: (token) => token.attributes?.category === "content",
  transform: (token) => {
    return `text-color-${token.path.slice(1).join("-")}`;
  },
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
  tailwindColorBackground: tailwindColorBackground.name,
  tailwindColorBorder: tailwindColorBorder.name,
  tailwindColorText: tailwindColorText.name,
  tailwindFontSize: tailwindFontSize.name,
  tailwindFontFamily: tailwindFontFamily.name,
  tailwindLineHeight: tailwindLineHeight.name,
} as const;

/**
 * Register all custom transforms with Style Dictionary
 */
export function registerTransforms(): void {
  [
    sizePx,
    tailwindColorBackground,
    tailwindColorBorder,
    tailwindColorText,
    tailwindFontSize,
    tailwindFontFamily,
    tailwindLineHeight,
  ].forEach((transform) => {
    StyleDictionary.registerTransform(transform);
  });
}

export default TRANSFORMS;
