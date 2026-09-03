import { readFileSync } from "node:fs";
import { resolve, basename } from "node:path";
import { load } from "cheerio";

export function parse(input) {
  const svgContent = readFileSync(resolve(input), "utf-8");

  // parse the SVG content and extract the viewBox and paths
  const $ = load(svgContent, { xml: true });
  const svg = $("svg")[0];

  const viewBox = svg.attribs["viewBox"] || "0 0 24 24";
  const [_minX, _minY, width, height] = viewBox.split(" ").map(Number);

  const paths = Array.from(
    svg.childNodes.filter((n) => n.tagName === "path")
  ).map((path) => ({
    ...path.attribs,
    fill: ["none", "currentColor"].includes(path.attribs.fill)
      ? undefined
      : path.attribs.fill,
  }));

  const comments = Array.from(svg.childNodes)
    .filter((node) => node.nodeType === 8) // Node.COMMENT_NODE
    .map((comment) => comment.nodeValue?.trim() || "")
    .filter(Boolean);

  const iconDefinition = {
    name: basename(input, ".svg"),
    comments,
    width,
    height,
    paths,
  };

  return iconDefinition;
}
