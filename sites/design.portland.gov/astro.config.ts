import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  integrations: [react(), mdx()],
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
