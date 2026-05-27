import type { Token } from "style-dictionary";

export type { Token };

export function getToken(source: Token, path: string[]) {
  if (typeof source === "string") {
    source = [source]!;
  }

  return path.reduce((obj, key) => obj[key], source);
}
