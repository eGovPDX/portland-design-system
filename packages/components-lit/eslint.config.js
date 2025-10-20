import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import lit from "eslint-plugin-lit";
import prettier from "eslint-plugin-prettier/recommended"
import ts from "typescript-eslint";
import wc from "eslint-plugin-wc";

export default defineConfig([
  {
    ignores: ["**/node_modules/**", "**/dist/**"],
  },
  eslint.configs.recommended,
  ts.configs.recommended,
  lit.configs["flat/recommended"],
  wc.configs["flat/recommended"],
  prettier,
]);
