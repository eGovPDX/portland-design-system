#!/usr/bin/env node
import { TOKEN_BUILDER } from "../builder.js";
import { ASSET_COPIER } from "../copier.js";
import args from "./args.js";

TOKEN_BUILDER.initialize();

TOKEN_BUILDER.build(args.mode).catch((error) => {
  console.error(error);
  process.exit(1);
});

ASSET_COPIER.copy().catch((error) => {
  console.error("❌ Error copying assets:", error);
  process.exit(1);
});
