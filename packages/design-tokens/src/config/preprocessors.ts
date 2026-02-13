import StyleDictionary from "style-dictionary";
import type { PreprocessedTokens, Preprocessor } from "style-dictionary/types";

/**
 * Transforms tokens to move certain tokens under the appropriate Tailwind namespaces
 * for cleaner use in utility classes.
 */
export const tailwindNamespaces: Preprocessor = {
  name: "tailwind/namespaces",
  preprocessor: async (original) => {
    const modified: PreprocessedTokens = {};

    /**
     * Mapping of original namespaces to new Tailwind namespaces.
     * Each entry maps an original namespace to one or more new namespaces.
     */
    const mapping: Record<string, string[][]> = {
      // Map background colors to background-color namespace.
      background: [["background", "color"]],
      // Map border colors to all related namespaces.
      border: [
        ["border", "color"],
        ["ring", "color"],
        ["outline", "color"],
      ],
      // Map content colors to text-color but also preserve in the global color namespace
      // for usage elsewhere.
      content: [
        ["text", "color"],
        ["color", "content"],
      ],
    };

    for (const [namespace, tokens] of Object.entries(original)) {
      if (namespace in mapping) {
        // traverse the path to create nested objects in the modified tokens
        for (const path of mapping[namespace]) {
          // remove the final segment of the path before traversing
          const final = path.pop();

          if (!final) {
            throw new Error(
              `Invalid mapping for namespace ${namespace}. A path is required.`
            );
          }

          // tokens at the end of the path
          path.reduce((acc, p) => {
            acc[p] = acc[p] || {};
            return acc[p];
          }, modified)[final] = tokens;
        }
      } else {
        modified[namespace] = tokens;
      }
    }

    return modified;
  },
};

/**
 * Custom preprocessor names for use in platform configurations
 */
export const PREPROCESSORS = {
  tailwindNamespaces: tailwindNamespaces.name,
} as const;

/**
 * All custom preprocessors for registration
 */
const ALL_PREPROCESSORS = [tailwindNamespaces];

/**
 * Register all custom preprocessors with Style Dictionary
 */
export function registerPreprocessors(): void {
  ALL_PREPROCESSORS.forEach((preprocessor) => {
    StyleDictionary.registerPreprocessor(preprocessor);
  });
}

export default PREPROCESSORS;
