import { readdirSync, readFileSync, writeFileSync } from "fs";
import { extname, join, parse, resolve } from "path";
import type { DesignToken } from "style-dictionary/types";

import { ASSETS_DIR, TOKENS_DIR } from "./constants.js";

/**
 * Convert file to base64 data URI
 */
function convertToBase64(filePath: string): string {
  const file = readFileSync(filePath);
  const mimeType = extname(filePath) === ".svg" ? "image/svg+xml" : "image/png";
  return `data:${mimeType};base64,${file.toString("base64")}`;
}

/**
 * Process assets directory and convert files to base64 encoded JSON tokens
 */
export function processAssets(): void {
  const tokens: Record<string, DesignToken> = {
    assets: {
      $type: "group",
      $description: "Base64 encoded assets",
    },
  };

  try {
    const files = readdirSync(ASSETS_DIR);

    for (const file of files) {
      const name = parse(file).name;
      const filePath = join(ASSETS_DIR, file);

      tokens.assets[name] = {
        $value: convertToBase64(filePath),
        $type: "asset",
      };
    }

    writeFileSync(
      resolve(TOKENS_DIR, "base", "assets.tokens.json"),
      JSON.stringify(tokens, null, 2)
    );
  } catch (error) {
    console.warn("Could not process assets:", error);
  }
}
