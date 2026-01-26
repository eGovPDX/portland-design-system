#!/usr/bin/env node
import { TOKEN_BUILDER } from "../builder.js";

TOKEN_BUILDER.initialize();

TOKEN_BUILDER.build().catch((error) => {
  console.error(error);
  process.exit(1);
});
