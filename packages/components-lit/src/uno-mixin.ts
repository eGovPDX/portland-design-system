import { css, LitElement } from "lit";

// This is a TypeScript helper to define a constructor type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = new (...args: any[]) => T;

/**
 * A mixin that applies the shared UnoCSS stylesheet to a LitElement component.
 */
export function UnoCSSMixin<T extends Constructor<LitElement>>(superClass: T) {
  return class UnoCSSElement extends superClass {
    // The key is to take any existing styles from the superClass
    // and append our shared styles to them.
    static styles = [
      css`
        @unocss-placeholder;
      `,
    ];
  };
}
