import { Box, type ReactBoxProps } from "@cityofportland/components-react/box";
import {
  BOX_COLORS,
  BOX_VARIANTS,
  validateBoxConfiguration,
  type BoxColorScheme,
  type BoxColorVariation,
} from "@cityofportland/types/box";
import { useStore } from "@nanostores/react";
import Color from "colorjs.io";
import { atom } from "nanostores";

import { Code } from "../../../components/code";
import React, { useEffect, useState } from "react";

const $color = atom<BoxColorScheme>("default");
const $variant = atom<BoxColorVariation>("subtle");

const getProperty = (element: Element, name: string) => {
  return getComputedStyle(element).getPropertyValue(name).trim();
};

function handleKeyPress(
  e: React.KeyboardEvent,
  filter: Array<string>,
  callback: () => void
) {
  if (!e.repeat && filter.includes(e.key)) {
    e.preventDefault();
    callback();
  }
}

export function ColorGallery() {
  const variant = useStore($variant);

  return (
    <div className="grid gap-xs">
      {BOX_COLORS.map((c) => {
        const [vc, vv] = validateBoxConfiguration(c, variant);

        if (!vc || !vv) return;

        return (
          <div key={`cg-${c}-${variant}`} className="grid gap-xs">
            <Box
              as="button"
              color={c}
              variant={variant}
              className="border-lg flex flex-col items-center divide-y-sm cursor-pointer"
              tabIndex={0}
              onClick={() => $color.set(c)}
              onKeyDown={(e) =>
                handleKeyPress(e, ["Enter", " "], () => $color.set(c))
              }
            >
              <span className="py-3xs">{c}</span>
              <span className="py-3xs">{variant}</span>
            </Box>
          </div>
        );
      })}
    </div>
  );
}

export function ContrastGallery() {
  const color = useStore($color);
  const variant = useStore($variant);

  const [backgroundColor, setBackgroundColor] = useState<string>("transparent");
  const [backgroundElement, setBackgroundElement] = useState<HTMLElement>();

  useEffect(() => {
    if (!backgroundElement) return;

    setBackgroundColor(
      getProperty(backgroundElement, "--box-background-color")
    );
  }, [backgroundElement, color, variant]);

  const ContrastBox = ({
    background,
    className,
    color,
    variant,
    property,
    ...props
  }: ReactBoxProps & {
    background: string;
    property: string;
  }) => {
    const [element, setElement] = useState<HTMLElement>();
    const [contrast, setContrast] = useState<string>();

    useEffect(() => {
      if (element) {
        const s = getComputedStyle(element);

        if (s) {
          setContrast(
            Color.contrastWCAG21(
              new Color(background),
              new Color(s.getPropertyValue(property).trim())
            ).toFixed(2)
          );
        }
      }
    }, [element]);

    return (
      <div className="flex-1 flex flex-col gap-2xs">
        <Box
          ref={(e: HTMLElement) => setElement(e)}
          color={color}
          variant={variant}
          className={[className, "flex justify-center"].join(" ")}
          {...props}
        >
          <p>Contrast: {contrast}</p>
        </Box>
      </div>
    );
  };

  return (
    <Box
      color={color}
      variant={variant}
      ref={(e: HTMLElement) => setBackgroundElement(e)}
      className="w-full border-lg p-xl grid gap-md"
    >
      {BOX_COLORS.map((c) => (
        <div className="w-full flex flex-col gap-xs">
          <span>{c}</span>
          {BOX_VARIANTS.map((v) => {
            const [vc, vv] = validateBoxConfiguration(c, v);

            return (
              vc &&
              vv && (
                <div className="">
                  <span>{v}</span>
                  <div className="w-full flex gap-xs">
                    <ContrastBox
                      color={vc}
                      variant={vv}
                      background={backgroundColor}
                      property="--box-background-color"
                      className="w-full p-lg content-center"
                    />
                    <ContrastBox
                      color={vc}
                      variant={vv}
                      background={backgroundColor}
                      property="--box-border-color"
                      className="ring-lg w-full p-lg"
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      ))}
    </Box>
  );
}

export function DemoBox({ children }: React.PropsWithChildren) {
  const color = useStore($color);
  const variant = useStore($variant);

  return (
    <div className="flex flex-col gap-xs">
      <Code
        language="tsx"
        code={`<Box as="div" color="${color}" variant="${variant}" className="border-lg p-2xl" />`}
      />
      <div className="flex flex-col xl:flex-row items-start xl:items-center gap-md">
        <Box color={color} variant={variant} className="border-lg p-2xl">
          {children}
        </Box>
      </div>
    </div>
  );
}

export function VariantGallery() {
  const color = useStore($color);

  return (
    <div className="grid gap-xs">
      {BOX_VARIANTS.map((v) => {
        const [vc, vv] = validateBoxConfiguration(color, v);

        if (!vc || !vv) return;

        return (
          <Box
            as="button"
            key={`vg-${color}-${v}`}
            color={color}
            variant={v}
            className="border-lg flex flex-col items-center divide-y-sm cursor-pointer"
            tabIndex={0}
            onClick={() => $variant.set(v)}
            onKeyUp={(e: React.KeyboardEvent) =>
              handleKeyPress(e, ["Enter", " "], () => $variant.set(v))
            }
          >
            <span className="py-3xs">{color}</span>
            <span className="py-3xs">{v}</span>
          </Box>
        );
      })}
    </div>
  );
}
