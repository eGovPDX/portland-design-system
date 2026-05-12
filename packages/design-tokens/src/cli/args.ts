import { parseArgs } from "util";

import type { BuildMode } from "../builder.js";

const { values: args } = parseArgs({
  args: process.argv.slice(2),
  options: {
    mode: {
      type: "string",
      default: "development",
    },
  },
});

export default args as {
  mode: BuildMode;
};
