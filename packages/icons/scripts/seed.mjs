import { error } from "node:console";
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { relative, resolve } from "node:path";
import process from "node:process";

import { parse } from "./parse.mjs";

const args = process.argv.slice(2);

if (args.length < 2) {
  error("Usage: import <input-file> <output-file>");
  process.exit(1);
}

const [input, output] = args;

const files = readdirSync(resolve(input), {
  recursive: true,
  withFileTypes: true,
}).filter((file) => file.isFile() && file.name.endsWith(".svg"));

files.forEach((file) => {
  const inputFilePath = [
    ["node_modules", "@fortawesome", "fontawesome-free", "svgs-full", "solid"],
    ["node_modules", "@fortawesome", "fontawesome-free", "svgs-full", "brands"],
  ]
    .map((p) => resolve(...p, file.name))
    .find((p) => existsSync(p));

  if (!inputFilePath) {
    error(`Could not find input file for ${file.name}`);
    return;
  }

  const outputFilePath = resolve(
    output,
    relative(input, file.parentPath),
    file.name.replace(/\.svg$/, ".ts")
  ).toLocaleLowerCase();

  mkdirSync(resolve(outputFilePath, ".."), { recursive: true });

  const content = `import type { IconDefintion } from "@cityofportland/types/icon";

export default ${JSON.stringify(parse(inputFilePath), null, 2)} as IconDefintion;
`;

  writeFileSync(resolve(outputFilePath), content, "utf-8");
});
