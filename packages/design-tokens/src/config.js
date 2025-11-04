import fs from "fs";
import path from "path";
import StyleDictionary from "style-dictionary";
import { transforms } from "style-dictionary/enums";

import tailwind from "./formats/tailwind.js";
import "./formats/unocss.js";
import "./formats/unocss-types.js";

// Process to rewrite assets into json files
function convertToBase64(filePath) {
  const file = fs.readFileSync(filePath);
  const mimeType =
    path.extname(filePath) === ".svg" ? "image/svg+xml" : "image/png";
  return `data:${mimeType};base64,${file.toString("base64")}`;
}

// Process assets directory
const assetsDir = "./src/assets";
const tokens = {
  assets: {
    $type: "group",
    $description: "Base64 encoded assets",
  },
};

fs.readdirSync(assetsDir).forEach((file) => {
  const name = path.parse(file).name;
  tokens.assets[name] = {
    $value: convertToBase64(path.join(assetsDir, file)),
    $type: "asset",
  };
});

fs.writeFileSync("./src/tokens/assets.json", JSON.stringify(tokens, null, 2));

// Custom transforms
StyleDictionary.registerTransform({
  name: "size/px",
  type: "value",
  filter: (token) => token.$type === "dimension",
  transform: (token) => `${token.$value}px`,
});

StyleDictionary.registerTransform({
  name: "font/weight",
  type: "value",
  filter: (token) => {
    return token.$type === "fontWeights";
  },
  transform: (token) => {
    const weights = {
      thin: "100",
      "extra-light": "200",
      light: "300",
      regular: "400",
      medium: "500",
      "semi-bold": "600",
      bold: "700",
      "extra-bold": "800",
      black: "900",
    };
    return weights[token.$value] || token.$value;
  },
});

StyleDictionary.registerTransform({
  name: "asset/url",
  type: "value",
  filter: (token) => token.$type === "asset",
  transform: (token) => `url(${token.$value})`,
});

StyleDictionary.registerTransform({
  name: "font/size/tailwind",
  type: "name",
  filter: (token) => token.$type === "fontSize",
  transform: (token) => {
    return `text-${token.path.slice(-1)}`;
  },
});

StyleDictionary.registerTransform({
  name: "font/family/tailwind",
  type: "name",
  filter: (token) => token.$type === "fontFamily",
  transform: (token) => {
    return `font-${token.path.slice(-1)}`;
  },
});

// Custom formats
StyleDictionary.registerFormat(tailwind);

// Custom transform groups
StyleDictionary.registerTransformGroup({
  name: "custom/css",
  transforms: [
    transforms.attributeCti,
    transforms.nameKebab,
    transforms.timeSeconds,
    transforms.colorCss,
    transforms.sizePxToRem,
    "asset/url",
  ],
});

StyleDictionary.registerTransformGroup({
  name: "custom/scss",
  transforms: [
    transforms.attributeCti,
    transforms.nameKebab,
    transforms.timeSeconds,
    transforms.colorCss,
    transforms.sizePxToRem,
    "asset/url",
  ],
});

StyleDictionary.registerTransformGroup({
  name: "custom/js",
  transforms: [
    transforms.attributeCti,
    transforms.nameConstant,
    "size/px",
    transforms.colorHex,
  ],
});

StyleDictionary.registerTransformGroup({
  name: "custom/tailwind",
  transforms: [
    transforms.attributeCti,
    transforms.nameKebab,
    transforms.timeSeconds,
    transforms.colorCss,
    transforms.sizePxToRem,
    "font/size/tailwind",
    "font/family/tailwind",
    "asset/url",
  ],
});

StyleDictionary.registerTransformGroup({
  name: "custom/unocss",
  transforms: [
    transforms.attributeCti,
    transforms.nameKebab,
    transforms.timeSeconds,
    transforms.colorCss,
    transforms.sizePxToRem,
    "font/size/tailwind",
    "font/family/tailwind",
    "asset/url",
  ],
});

const config = {
  source: ["src/tokens/**/*.json"],
  log: {
    warnings: "warn",
    verbosity: "verbose",
    errors: {
      brokenReferences: "throw",
    },
  },
  platforms: {
    js: {
      transformGroup: "custom/js",
      buildPath: "dist/",
      files: [
        {
          destination: "index.js",
          format: "javascript/es6",
        },
        {
          destination: "index.d.ts",
          format: "typescript/es6-declarations",
        },
      ],
    },
    scss: {
      transformGroup: "custom/scss",
      buildPath: "dist/scss/",
      files: [
        {
          destination: "_variables.scss",
          format: "scss/variables",
          options: {
            showFileHeader: true,
          },
        },
      ],
    },
    css: {
      transformGroup: "custom/css",
      buildPath: "dist/css/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
          options: {
            showFileHeader: true,
            selector: ":root",
          },
        },
      ],
    },
    json: {
      transformGroup: "custom/js",
      buildPath: "dist/json/",
      files: [
        {
          destination: "tokens.json",
          format: "json/nested",
        },
      ],
    },
    tailwind: {
      transformGroup: "custom/tailwind",
      buildPath: "dist/tailwind/",
      files: [
        {
          destination: "theme.css",
          format: "css/tailwind",
          options: {
            showFileHeader: true,
          },
        },
      ],
    },
    unocss: {
      transformGroup: "custom/unocss",
      buildPath: "dist/unocss/",
      files: [
        {
          destination: "theme.js",
          format: "javascript/unocss",
          options: {
            showFileHeader: true,
          },
        },
        {
          destination: "theme.d.ts",
          format: "typescript/unocss-declarations",
          options: {
            showFileHeader: true,
          },
        },
      ],
    },
  },
};

export default config;
