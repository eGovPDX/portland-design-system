import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import prettier from "eslint-plugin-prettier/recommended";

export default defineConfig([eslint.configs.recommended, prettier]);
