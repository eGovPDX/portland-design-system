import { readdirSync } from "fs";
import { defineConfig, type UserConfig } from "tsdown";

const IGNORE_PATTERN = /node_modules|dist$/;

const ENTRIES = readdirSync(".", { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory() && !IGNORE_PATTERN.test(dirent.name))
  .filter((dirent) =>
    readdirSync(dirent.name, { withFileTypes: true }).some(
      (d) => d.isFile() && d.name === "action.ts"
    )
  )
  .map((dirent) => dirent.name);

export default defineConfig(
  ENTRIES.map(
    (entry) =>
      ({
        entry: `${entry}/action.ts`,
        outDir: `${entry}`,
        target: "node24",
        platform: "node",
        clean: false,
        minify: true,
      }) as UserConfig
  )
);
