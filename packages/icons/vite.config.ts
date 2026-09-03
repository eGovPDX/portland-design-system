import type { IconDefinition } from "@cityofportland/types/icon";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "fs";
import { EOL } from "os";
import { dirname, extname, join, parse, relative, resolve } from "path";
import pc from "picocolors";
import { optimize } from "svgo";
import { defineConfig, type Plugin } from "vite";
import dts from "vite-plugin-dts";

const ROOT = resolve(__dirname);
const SRC_DIR = resolve(ROOT, "src");
const DIST_JS_DIR = resolve(ROOT, "dist/js");
const DIST_SVGS_DIR = resolve(ROOT, "dist/svgs");

const entries = readdirSync(SRC_DIR, { recursive: true, withFileTypes: true })
  .filter((file) => file.isFile() && extname(file.name) === ".ts")
  .map((file) => {
    const parsed = parse(
      relative(SRC_DIR, resolve(file.parentPath, file.name))
    );

    return [
      join(parsed.dir, parsed.name),
      resolve(SRC_DIR, file.parentPath, file.name),
    ];
  })
  .reduce(
    (acc, [identifier, path]) => {
      acc[identifier] = path;
      return acc;
    },
    {} as Record<string, string>
  );

const generateBarrel = (): Plugin => {
  const virtualModuleId = "virtual:barrel.ts";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;

  const generateIdentifier = (path: string): string => {
    const parsed = parse(path);
    return parsed.name
      .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
      .replace(/-([0-9])/g, (_, number) => `${number}`);
  };

  return {
    name: "virtual-barrel",
    enforce: "pre",
    resolveId(id: string) {
      if (id.endsWith(virtualModuleId)) return resolvedVirtualModuleId;
    },
    load(id: string) {
      if (id === resolvedVirtualModuleId) {
        // This content will be generated dynamically in the plugin's buildStart hook
        return [
          "/* Auto-generated file - do not edit */",
          "",
          // Generate imports: base files first, then component files alphabetically
          ...Object.entries(entries).map(([_, file]) => {
            const parsed = parse(file);
            return `export { default as ${generateIdentifier(file)} } from "${join(parsed.dir, parsed.name)}";`;
          }),
        ].join(EOL);
      }
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "index.d.ts",
        source: [
          "import { IconDefinition } from '@cityofportland/types/icon';",
          ...Object.entries(entries).map(
            ([_, path]) =>
              `export declare const ${generateIdentifier(path)}: IconDefinition;`
          ),
        ].join(EOL),
      });
    },
  };
};

const generateSVGs = (): Plugin => {
  return {
    name: "generate-svgs",
    enforce: "post",
    async writeBundle(_options, bundle) {
      Object.entries(bundle)
        .filter(([file]) => file !== "index.js")
        .filter(([_, chunk]) => chunk.type === "chunk")
        .forEach(async ([file]) => {
          const parsed = parse(file);

          const definition: IconDefinition = await import(
            resolve(DIST_JS_DIR, file)
          ).then((mod) => mod.default);

          const svgSource = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${definition.width} ${definition.height}">
          ${definition.comments?.map((comment) => `<!-- ${comment} -->`).join("\n") ?? ""}
          ${definition.paths
            .map(
              (path) =>
                `<path d="${path.d}"${
                  path.fill ? ` fill="${path.fill}"` : ""
                }${path["clip-rule"] ? ` clip-rule="${path["clip-rule"]}"` : ""}${
                  path["fill-rule"] ? ` fill-rule="${path["fill-rule"]}"` : ""
                }/>`
            )
            .join(EOL)}
          </svg>`;

          const distPath = resolve(DIST_SVGS_DIR, `${parsed.name}.svg`);

          const distDir = dirname(distPath);

          if (!existsSync(distDir)) {
            mkdirSync(distDir, { recursive: true });
          }

          writeFileSync(distPath, optimize(svgSource).data);

          const sizeInKilobytes = statSync(distPath).size / 1024;

          console.log(
            `${pc.blackBright(relative(ROOT, DIST_SVGS_DIR))}/${pc.cyanBright(relative(DIST_SVGS_DIR, distPath))} (${sizeInKilobytes.toFixed(2)} kB)`
          );
        });
    },
  };
};

export default defineConfig({
  plugins: [dts(), generateBarrel(), generateSVGs()],
  build: {
    outDir: DIST_JS_DIR,
    emptyOutDir: true,
    lib: {
      entry: {
        ...entries,
        index: "virtual:barrel.ts",
      },
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        preserveModules: true,
        entryFileNames: "[name].js",
      },
    },
  },
});
