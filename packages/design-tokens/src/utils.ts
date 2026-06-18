import type { Token } from "style-dictionary";

export type { Token };

export function get(source: Token, path: string[]): Token {
  if (typeof source === "string") {
    source = [source]!;
  }

  return path.reduce((obj, key) => obj[key], source);
}

export function traverse(
  source: Token,
  callback: (token: Token, path: string[], depth: number) => void,
  path: string[] = [],
  depth = 1
): void {
  if (typeof source === "string") {
    callback(source, path, depth);
  } else {
    for (const key in source) {
      traverse(source[key], callback, [...path, key], depth + 1);
    }
  }
}
