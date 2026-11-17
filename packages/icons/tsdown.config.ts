import type { IconDefinition } from "@cityofportland/types/icon";
import { load } from "cheerio";
import { randomUUID } from "node:crypto";
import { statSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { basename, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import pc from "picocolors";
import { optimize } from "svgo";
import { defineConfig, type TsdownPlugin } from "tsdown";

const root = fileURLToPath(new URL(".", import.meta.url));
const output = resolve(root, "dist");

// Emit matching runtime and type barrels from the actual output entries.
const barrel: TsdownPlugin = {
  name: "virtual-barrel",
  generateBundle(_options, bundle) {
    const names = new Set<string>();

    const exports = Object.values(bundle)
      .filter(
        (chunk) =>
          chunk.type === "chunk" &&
          chunk.isEntry &&
          chunk.fileName.endsWith(".js")
      )
      .sort((a, b) => a.fileName.localeCompare(b.fileName))
      .map((chunk) => {
        const stem = basename(chunk.fileName, ".js");
        const name = stem.replace(/-([a-z0-9])/g, (_, letter: string) =>
          letter.toUpperCase()
        );
        if (
          stem === "index" ||
          !/^[A-Za-z_$][\w$]*$/.test(name) ||
          names.has(name)
        ) {
          throw new Error(
            `Invalid or duplicate icon export: ${chunk.fileName}`
          );
        }
        names.add(name);
        return `export { default as ${name} } from ${JSON.stringify(`./${chunk.fileName}`)};`;
      });

    if (!exports.length) return;

    for (const fileName of ["index.js", "index.d.ts"]) {
      this.emitFile({
        type: "asset",
        fileName,
        source: `${exports.join("\n")}\n`,
      });
    }
  },
};

export default defineConfig({
  cwd: root,
  entry: ["src/**/*.ts", "!src/**/*.d.ts"],
  root: "src",
  outDir: resolve(output, "js"),
  format: "esm",
  platform: "neutral",
  unbundle: true,
  dts: true,
  deps: { alwaysBundle: [/^@cityofportland\/types(?:\/|$)/] },
  outExtensions: () => ({ js: ".js", dts: ".d.ts" }),
  plugins: [barrel],
  hooks: {
    "build:done": async ({ chunks }) => {
      const svgDirectory = resolve(output, "svgs");
      const filenames = new Set<string>();
      const revision = randomUUID();
      await mkdir(svgDirectory, { recursive: true });

      for (const chunk of chunks) {
        if (
          chunk.type !== "chunk" ||
          !chunk.isEntry ||
          !chunk.fileName.endsWith(".js")
        )
          continue;

        const filename = `${basename(chunk.fileName, ".js")}.svg`;

        if (filenames.has(filename))
          console.warn(`Duplicate SVG filename: ${filename}`);

        filenames.add(filename);

        const url = pathToFileURL(resolve(chunk.outDir, chunk.fileName));
        // Each watch rebuild must read the newly compiled icon definition.
        url.searchParams.set("revision", revision);

        const { default: icon }: { default: IconDefinition } = await import(
          url.href
        );

        const $ = load("<svg/>", { xml: true });
        const svg = $("svg").attr({
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: `0 0 ${icon.width} ${icon.height}`,
        });

        for (const comment of icon.comments ?? []) {
          const node = $("<!-- -->")[0];
          if (node?.type === "comment") {
            node.data = ` ${comment} `;
            svg.append(node);
          }
        }

        for (const path of icon.paths) {
          const element = $("<path/>");
          for (const [name, value] of Object.entries(path)) {
            if (value !== undefined) element.attr(name, value);
          }
          svg.append(element);
        }

        await writeFile(
          resolve(svgDirectory, filename),
          optimize($.xml()).data
        );

        const sizeInKilobytes =
          statSync(resolve(svgDirectory, filename)).size / 1024;

        console.log(
          `${pc.blackBright(relative(root, svgDirectory))}/${pc.cyanBright(relative(svgDirectory, resolve(svgDirectory, filename)))} (${sizeInKilobytes.toFixed(2)} kB)`
        );
      }
    },
  },
});
