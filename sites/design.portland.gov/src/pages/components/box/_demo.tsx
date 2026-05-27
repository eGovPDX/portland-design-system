import {
  BOX_COLORS,
  BOX_VARIANTS,
  type BoxColorScheme,
} from "@cityofportland/types/box";
import { Box } from "@cityofportland/components-react/box";
import { useStore } from "@nanostores/react";
import { atom } from "nanostores";

import { Code } from "../../../components/code";

const $color = atom<BoxColorScheme>("default");
const $variant = atom("subtle");

export function DemoBox({ children }: React.PropsWithChildren<{}>) {
  const color = useStore($color);
  const variant = useStore($variant);

  return (
    <div className="grid gap-xs">
      <Code
        language="tsx"
        code={`<Box as="div" color="${color}" variant="${variant}" className="border-lg p-2xl"></Box>`}
        className="-mx-xs"
      />
      <Box color={color} variant={variant} className="border-lg p-2xl">
        {children}
      </Box>
    </div>
  );
}

export function VariantGallery() {
  const color = useStore($color);

  return (
    <div className="grid gap-xs">
      {BOX_VARIANTS.map((v) => (
        <Box
          key={`vg-${color}-${v}`}
          color={color}
          variant={v}
          className="border-lg flex flex-col items-center divide-y-sm cursor-pointer"
          onClick={() => $variant.set(v)}
        >
          <span className="py-3xs">{color}</span>
          <span className="py-3xs">{v}</span>
        </Box>
      ))}
    </div>
  );
}

export function ColorGallery() {
  const variant = useStore($variant);

  return (
    <div className="grid gap-xs">
      {BOX_COLORS.map((c) => (
        <div className="grid gap-xs">
          <Box
            key={`cg-${c}-${variant}`}
            color={c}
            variant={variant}
            className="border-lg flex flex-col items-center divide-y-sm cursor-pointer"
            onClick={() => $color.set(c)}
          >
            <span className="py-3xs">{c}</span>
            <span className="py-3xs">{variant}</span>
          </Box>
        </div>
      ))}
    </div>
  );
}
