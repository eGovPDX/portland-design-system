import mdx from "@astrojs/mdx";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import fs from "node:fs";
import path, { sep } from "node:path";
import { fileURLToPath } from "node:url";

import { getTokens } from "./src/pages/tokens/_id";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  integrations: [react(), mdx()],
  markdown: {
    rehypePlugins: [
      rehypeHeadingIds,
      () => {
        // All remark and rehype plugins return a separate function
        return function (tree, file) {
          if (!file.data.astro) return;

          const p = path
            .relative(path.join(__dirname, "src"), file.path)
            .split(sep)
            .reduce((parts, part, index, arr) => {
              if (part === "tokens") {
                parts.push(...arr.slice(index + 1));
              }
              return parts;
            }, new Array<string>())
            .filter((part) => !["pages", "tokens"].includes(part))
            .map((part) => path.basename(part, ".mdx"))
            .filter((part) => !["index"].includes(part)); // Remove file extension;

          if (p.length === 0) return;

          const headings = file.data.astro.headings || [];

          headings.push(
            ...getTokens(p).map(({ depth, text, slug }) => ({
              depth,
              text,
              slug,
            }))
          );

          file.data.astro.headings = headings;
        };
      },
    ],
  },
  vite: {
    plugins: [
      tailwindcss(),
      {
        name: "serve-storybook-dev",
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = new URL(
              req.url || "",
              `http://${process.env.HOST || "localhost"}`
            );

            // Only handle paths that don't look like files (no extension)
            if (
              !path.extname(url.pathname) &&
              fs.existsSync(
                path.join(__dirname, "public", url.pathname, "index.html")
              )
            ) {
              if (url.pathname.endsWith("/")) {
                req.url = [url.pathname, "index.html"].join("/");
              } else {
                // Redirect to the path with a trailing slash if it doesn't have one
                res.writeHead(301, { Location: url.pathname + "/" }).end();
                return;
              }
            }

            next();
          });
        },
      },
    ],
  },
});
