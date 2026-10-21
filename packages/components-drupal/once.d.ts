export {};

declare global {
  type OnceContext = Document | Element;
  type OnceElements<T extends Element> = T | ArrayLike<T> | null;

  interface OnceMethod {
    <K extends keyof HTMLElementTagNameMap>(
      id: string,
      selector: K,
      context?: OnceContext
    ): HTMLElementTagNameMap[K][];

    <T extends Element>(
      id: string,
      selector: OnceElements<T>,
      context?: OnceContext
    ): T[];

    (id: string, selector: string, context?: OnceContext): Element[];
  }

  interface Once extends OnceMethod {
    remove: OnceMethod;
    filter: OnceMethod;
    find(id?: string, context?: OnceContext): Element[];
  }

  const once: Once;
}
