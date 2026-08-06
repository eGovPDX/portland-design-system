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
    if (route.children) {
      return (
        <Accordion key={route.href} open={current.startsWith(route.href)}>
          <NavItem
            as="div"
            color={current === route.href ? "primary" : undefined}
            variant={current === route.href ? "subtle" : undefined}
          >
            <AccordionHeader className={className}>
              <a
                href={`${import.meta.env.BASE_URL}/${route.href}`}
                className="link font-semibold"
              >
                {route.label}
              </a>
              <AccordionButton size="2xs" className="text-body-sm" />
            </AccordionHeader>
          </NavItem>
          {route.children && route.children.length > 0 && (
            <AccordionContent className="grid gap-2xs">
              {route.children.map((child) =>
                renderer(child, "px-2xs py-3xs pl-md")
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
        color={current === route.href ? "primary" : undefined}
        variant={current === route.href ? "subtle" : undefined}
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
        return renderer(route, "px-2xs py-3xs");
      })}
    </Box>
  );
}
