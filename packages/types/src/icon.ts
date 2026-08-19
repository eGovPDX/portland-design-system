export const ICON_SIZES = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
] as const;

export type IconSize = (typeof ICON_SIZES)[number];

export type IconDefinition = {
  name: string;
  description?: string;
  comments?: string[];
  width: number;
  height: number;
  paths: {
    d: string;
    fill?: string;
  }[];
};

export interface IconProps {
  icon: IconDefinition;
  size?: IconSize;
}
