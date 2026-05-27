import { getToken, type Token } from "@cityofportland/design-tokens/utils";
import base from "@cityofportland/design-tokens/json/base.json" with { type: "json" };
import dark from "@cityofportland/design-tokens/json/dark.json" with { type: "json" };
import xl from "@cityofportland/design-tokens/json/xl.json" with { type: "json" };

export type Path = Array<string>;

export type Heading = {
  depth: number;
  path: Path;
  text: string;
  slug: string;
  value: Token;
};

export type HeadingParam = Pick<Heading, "depth" | "path" | "value">;
export type HeadingFunction = (
  p: HeadingParam["path"],
  d: HeadingParam["depth"],
  v: HeadingParam["value"],
  ...args: any[]
) => Heading | React.JSX.Element;

export const retrieveToken = (source: Token | string, path: Path): Token => {
  if (typeof source === "string") {
    source = { base, dark, xl }[source]!;
  }

  return getToken(source, path);
};

export const getTokens = (path: Path): Array<Heading> => {
  if (!path || path.length === 0) {
    return [];
  }

  const value = getToken(base, path);

  const heading: HeadingFunction = (path, depth, value): Heading => ({
    depth,
    path,
    text: path.join("."),
    slug: path.join("-"),
    value: value,
  });

  const headings: Array<Heading> = [heading(path, 1, value) as Heading];

  const depth = 1;

  function traverse(o: Token, p: Array<string>, d: number) {
    if (o !== null && typeof o == "object") {
      Object.entries(o).forEach(([key, value]) => {
        headings.push(heading([...p, key], d + 1, value) as Heading);
        // key is either an array index or object key
        traverse(value, [...p, key], d + 1);
      });
    } else {
      // jsonObj is a number or string
    }
  }

  traverse(value, path, depth);

  return headings;
};
