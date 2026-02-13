import { resolve } from "path";
import type {
  Filter,
  PlatformConfig,
  TransformedToken,
} from "style-dictionary/types";
import { formats, transforms } from "style-dictionary/enums";

import { DIST_DIR } from "./constants.js";
import customFormats from "./formats.js";
import customPreprocessors from "./preprocessors.js";
import customTransforms from "./transforms.js";
import { type VariantCategory } from "./variants.js";

type FileFilter = string | Partial<TransformedToken> | Filter["filter"];

type PlatformGenerator = (
  category: VariantCategory | undefined,
  name: string,
  filter: FileFilter
) => PlatformConfig;

export const css: PlatformGenerator = (_category, name, filter) => ({
  transforms: [
    transforms.attributeCti,
    transforms.nameKebab,
    transforms.timeSeconds,
    transforms.colorCss,
    transforms.sizePxToRem,
    transforms.assetUrl,
  ],
  buildPath: resolve(DIST_DIR, "css"),
  files: [
    {
      destination: `${name}.css`,
      format: formats.cssVariables,
      filter,
      options: {
        showFileHeader: true,
        selector: ":root",
      },
    },
  ],
});

export const js: PlatformGenerator = (_category, name, filter) => ({
  transforms: [
    transforms.attributeCti,
    transforms.nameConstant,
    transforms.sizePxToRem,
    transforms.colorHex,
  ],
  buildPath: resolve(DIST_DIR, "js"),
  files: [
    {
      destination: `${name}.js`,
      format: formats.javascriptEs6,
      filter,
    },
  ],
});

export const json: PlatformGenerator = (_category, name, filter) => ({
  transforms: [
    transforms.attributeCti,
    transforms.nameConstant,
    customTransforms.sizePx,
    transforms.colorHex,
  ],
  buildPath: resolve(DIST_DIR, "json"),
  files: [
    {
      destination: `${name}.json`,
      format: formats.jsonNested,
      filter,
    },
  ],
});

export const jsTypes: PlatformGenerator = (_category, name, filter) => ({
  transforms: [
    transforms.attributeCti,
    transforms.nameConstant,
    transforms.sizePxToRem,
    transforms.colorHex,
  ],
  buildPath: resolve(DIST_DIR, "js"),
  files: [
    {
      destination: `${name}.d.ts`,
      format: formats.typescriptEs6Declarations,
      filter,
    },
  ],
});

export const scss: PlatformGenerator = (_category, name, filter) => ({
  transforms: [
    transforms.attributeCti,
    transforms.nameKebab,
    transforms.timeSeconds,
    transforms.colorCss,
    transforms.sizePxToRem,
    transforms.assetUrl,
  ],
  buildPath: resolve(DIST_DIR, "scss"),
  files: [
    {
      destination: `_${name}.scss`,
      format: formats.scssVariables,
      filter,
      options: {
        showFileHeader: true,
      },
    },
  ],
});

export const tailwind: PlatformGenerator = (category, name, filter) => ({
  transforms: [
    transforms.attributeCti,
    transforms.nameKebab,
    transforms.timeSeconds,
    transforms.colorCss,
    transforms.sizePxToRem,
    transforms.assetUrl,
    customTransforms.tailwindFontSize,
    customTransforms.tailwindFontFamily,
    customTransforms.tailwindLineHeight,
  ],
  preprocessors: [customPreprocessors.tailwindNamespaces],
  buildPath: resolve(DIST_DIR, "tailwind"),
  files: [
    {
      destination: `${name}.css`,
      format: customFormats.tailwind,
      filter,
      options: {
        showFileHeader: true,
        name,
        category,
      },
    },
  ],
});

export const PLATFORMS = {
  css,
  js,
  json,
  jsTypes,
  scss,
  tailwind,
} as const;

export type Platform = keyof typeof PLATFORMS;

export default PLATFORMS;
