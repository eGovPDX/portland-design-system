export const INPUT_ADDON_ORIENTATIONS = ["start", "end"] as const;

export type InputAddonOrientation = (typeof INPUT_ADDON_ORIENTATIONS)[number];

export interface InputAddonProps {
  /**
   * The ID of the input element this addon is associated with.
   */
  id: string;

  /**
   * The orientation of the addon relative to the input element.
   */
  orientation: InputAddonOrientation;

  /**
   * Whether the addon should be announced to assistive technologies.
   */
  announce?: boolean;
}
