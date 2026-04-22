declare module "*.component.yml" {
  export function component(props: Record<string, unknown>): string;
  export const args: {
    defaultAttributes: Array<[string, string | string[]]>;
    [key: string]: unknown;
  };
}
