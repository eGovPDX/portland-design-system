import {
  get as getToken,
  traverse,
  type Token,
} from "@cityofportland/design-tokens/utils";
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
  ...args: unknown[]
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

  const headings = new Array<Heading>();

  const depth = 1;

  traverse(
    value,
    (t, p, d) => {
      headings.push(heading(p, d, t) as Heading);
    },
    path,
    depth
  );

  return headings;
};
