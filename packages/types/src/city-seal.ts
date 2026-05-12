/**
 * @file City Seal component types
 * @description Shared TypeScript types for polymorphic City Seal components across all frameworks
 */

/**
 * Available size variations for the City Seal
 */
export const CITY_SEAL_SIZES = ["xl", "lg", "sm"] as const;

export type CitySealSize = (typeof CITY_SEAL_SIZES)[number];

/**
 * Core CitySeal properties shared across all framework implementations
 */
export interface CitySealProps {
  /**
   * Size of the City Seal
   * @default "lg"
   */
  size?: CitySealSize;
}
