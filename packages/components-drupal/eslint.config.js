import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import prettier from "eslint-plugin-prettier/recommended";

export default defineConfig([
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/storybook-static/**"],
  },
  eslint.configs.recommended,
  prettier,
]);
