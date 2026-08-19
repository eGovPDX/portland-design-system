import { error } from "node:console";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import process from "node:process";

import { parse } from "./parse.mjs";

const args = process.argv.slice(2);

if (args.length < 2) {
  error("Usage: import <input-file> <output-file>");
  process.exit(1);
}

const [input, output] = args;

mkdirSync(resolve(output, ".."), { recursive: true });

const content = `import type { IconDefintion } from "@cityofportland/types/icon";

export default ${JSON.stringify(parse(input), null, 2)} as IconDefintion;
`;

writeFileSync(resolve(output), content, "utf-8");
