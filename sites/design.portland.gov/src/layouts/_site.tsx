import { Box } from "@cityofportland/components-react/box";

import {
  Accordion,
  AccordionButton,
  AccordionContent,
  AccordionHeader,
} from "../components/accordion";
import { NavItem } from "../components/nav/item";

type Route = {
  href: string;
  label: string;
  children?: Route[];
};

export function SiteNav({
  routes,
  current,
  className,
}: React.HTMLAttributes<HTMLDivElement> & {
  routes: Route[];
  current: string;
}) {
  const renderer = (route: Route, className?: string) => {
    const tree = (path: string) => path.split("/").filter(Boolean);

    const sameOrdered = (a: string[], b: string[]) =>
      a.length === b.length && a.every((v, i) => v === b[i]);

    if (route.children) {
      return (
        <Accordion
          key={route.href}
          open={tree(route.href).every((n) => tree(current).includes(n))}
        >
          <NavItem
            as="div"
            color={
              sameOrdered(tree(current), tree(route.href))
                ? "primary"
                : undefined
            }
            variant={
              sameOrdered(tree(current), tree(route.href))
                ? "subtle"
                : undefined
            }
          >
            <AccordionHeader className={className}>
              <a
                href={`${import.meta.env.BASE_URL}${route.href}`}
                className="grow link font-semibold"
              >
                {route.label}
              </a>
              <AccordionButton size="2xs" className="text-body-sm" />
            </AccordionHeader>
          </NavItem>
          {route.children && route.children.length > 0 && (
            <AccordionContent className="border-l-xl grid">
              {route.children.map((child) =>
                renderer(child, "pl-xl pr-xs py-xs")
              )}
            </AccordionContent>
          )}
        </Accordion>
      );
    }

    return (
      <NavItem
        key={route.href}
        as="a"
        color={
          sameOrdered(tree(current), tree(route.href)) ? "primary" : undefined
        }
        variant={
          sameOrdered(tree(current), tree(route.href)) ? "subtle" : undefined
        }
        href={`${import.meta.env.BASE_URL}${route.href}`}
        className={className}
      >
        <span className="link font-semibold">{route.label}</span>
      </NavItem>
    );
  };

  return (
    <Box className={[className].filter(Boolean).join(" ")}>
      {routes.map((route) => {
        return renderer(route, "pl-xl pr-xs py-xs");
      })}
    </Box>
  );
}
