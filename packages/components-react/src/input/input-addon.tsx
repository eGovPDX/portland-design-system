import type {
  InputAddonOrientation,
  InputAddonProps,
} from "@cityofportland/types/input-addon";
import React from "react";

import { Box, type ReactBoxProps } from "../box";
import { mergeClasses } from "../utils";

export type { InputAddonOrientation };

export type ReactInputAddonProps = React.PropsWithChildren<
  Omit<ReactBoxProps<"span">, "as" | "id"> &
    Omit<InputAddonProps, "orientation"> & {
      orientation?: InputAddonOrientation;
    }
>;

export const getInputAddonId = (
  id: string,
  orientation: InputAddonOrientation
) => `${id}__${orientation === "start" ? "prefix" : "suffix"}`;

export const InputAddon: React.FC<ReactInputAddonProps> = ({
  id,
  orientation = "start",
  announce = false,
  children,
  className,
  ...props
}) => (
  <Box
    as="span"
    id={getInputAddonId(id, orientation)}
    className={mergeClasses(
      "input__addon",
      `input__addon--${orientation}`,
      className
    )}
    aria-hidden={announce ? undefined : true}
    {...props}
  >
    {announce && (
      <span className="sr-only">
        {orientation === "start" ? "prefix" : "suffix"}
      </span>
    )}
    {children}
  </Box>
);
