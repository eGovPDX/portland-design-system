import { defineConfig } from "eslint/config";
import prettier from "eslint-plugin-prettier/recommended";
import react from "eslint-plugin-react";
import reacthook from "eslint-plugin-react-hooks";

export default defineConfig([
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/storybook-static/**"],
  },
  prettier,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  reacthook.configs.flat.recommended,
]);
