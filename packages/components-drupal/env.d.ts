declare module "*.component.yml" {
  export function component(props: Record<string, unknown>): string;
}
