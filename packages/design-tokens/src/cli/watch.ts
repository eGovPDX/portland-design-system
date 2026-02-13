#!/usr/bin/env node
import { watch } from "fs";

import { ASSETS_DIR, TOKENS_DIR } from "../config/constants.js";
import { TOKEN_BUILDER } from "../builder.js";

/**
 * Watch script for design tokens
 *
 * This script watches for changes to *.tokens.json files in the tokens folder
 * and asset files in the assets folder, then triggers a rebuild when changes
 * are detected.
 */

const DEBOUNCE_MS = 300;

let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let building: Promise<void> | null = null;

async function run(): Promise<void> {
  if (building !== null) {
    console.log("⏳ Build already in progress, skipping...");
    return;
  }

  building = TOKEN_BUILDER.build().finally(() => {
    building = null;
  });

  return building;
}

function createWatcher(
  dir: string,
  filter: (filename: string) => boolean,
  label: string
): ReturnType<typeof watch> {
  console.log(`📁 Watching ${label}: ${dir}`);

  const watcher = watch(dir, { recursive: true }, (eventType, filename) => {
    if (!filename || !filter(filename)) {
      return;
    }

    console.log(`\n📝 ${eventType}: ${filename}`);

    // Debounce rapid changes
    if (debounceTimer !== null) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(() => {
      debounceTimer = null;
      console.log("🔄 Changes detected, rebuilding tokens...");
      run();
    }, DEBOUNCE_MS);
  });

  watcher.on("error", (error) => {
    console.error(`❌ Watch error (${label}):`, error);
  });

  return watcher;
}

async function start(): Promise<void> {
  console.log("👀 Starting file watchers...");

  const watchers = [
    createWatcher(
      TOKENS_DIR,
      (filename) => filename.endsWith(".tokens.json"),
      "tokens"
    ),
    createWatcher(
      ASSETS_DIR,
      () => true, // Watch all asset files
      "assets"
    ),
  ];

  const handleShutdown = async () => {
    console.log("\n👋 Stopping watch...");

    for (const watcher of watchers) {
      watcher.close();
    }

    if (building !== null) {
      console.log("⏳ Waiting for ongoing build to finish...");
      await building;
    }
    process.exit(0);
  };

  process.on("SIGINT", handleShutdown);
  process.on("SIGTERM", handleShutdown);
}

// Initialize transforms/formats once, run initial build, then start watching
console.log("🚀 Starting design tokens watch mode...");

TOKEN_BUILDER.initialize();

await run();

start();
