export const ICON_SIZES = ["xs", "sm", "md", "lg"] as const;

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
    [index: string]: string | undefined;
  }[];
};

export interface IconProps {
  icon: IconDefinition;
  size?: IconSize;
}
