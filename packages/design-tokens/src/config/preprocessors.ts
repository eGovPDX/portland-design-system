import StyleDictionary from "style-dictionary";
import type { Preprocessor } from "style-dictionary/types";

export const tailwindNamespaces: Preprocessor = {
  name: "tailwind/namespaces",
  preprocessor: async (dictionary) => {
    const newDictionary: typeof dictionary = {};

    for (const [namespace, tokens] of Object.entries(dictionary)) {
      switch (namespace) {
        // Map background colors to background-color namespace.
        case "background":
          newDictionary["background-color"] = tokens;
          break;

        // Map border colors to all related namespaces.
        case "border": {
          const prefixes = ["border-color", "ring-color", "outline-color"];
          for (const prefix of prefixes) {
            newDictionary[prefix] = tokens;
          }
          break;
        }

        // Map content colors to text-color but also preserve in the global color namespace for usage elsewhere.
        case "content":
          newDictionary["text-color"] = tokens;
          newDictionary["color-content"] = tokens;
          break;

        default:
          newDictionary[namespace] = tokens;
      }
    }

    return newDictionary;
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
