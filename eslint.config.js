import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import prettier from "eslint-plugin-prettier/recommended";
import react from "eslint-plugin-react";
import reacthook from "eslint-plugin-react-hooks";
import lit from "eslint-plugin-lit";
import wc from "eslint-plugin-wc";
import ts from "typescript-eslint";

export default defineConfig(
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/storybook-static/**",
      "**/*.test.*",
    ],
  },
  eslint.configs.recommended,
  ts.configs.recommended,
  prettier,
  {
    files: ["packages/components-lit/**"],
    ...lit.configs["flat/recommended"],
    ...wc.configs["flat/recommended"],
  },
  {
    files: ["packages/components-react/**"],
    ...react.configs.flat.recommended,
    ...react.configs.flat["jsx-runtime"],
    ...reacthook.configs.flat.recommended,
  },
  {
    // see: https://typescript-eslint.io/rules/no-unused-vars/#what-benefits-does-this-rule-have-over-typescript
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
);
