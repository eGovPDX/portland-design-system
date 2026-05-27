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
  const renderer = (route: Route) => {
    if (route.children) {
      return (
        <Accordion key={route.href} open={current.startsWith(route.href)}>
          <NavItem
            as="div"
            color={current === route.href ? "primary" : undefined}
            variant={current === route.href ? "subtle" : undefined}
          >
            <AccordionHeader>
              <a
                href={route.href}
                className="font-semibold underline underline-offset-4"
              >
                {route.label}
              </a>
              <AccordionButton className="outline-2 focus:outline-4 outline-offset-2 rounded-sm px-2xs py-3xs text-body-sm ml-auto" />
            </AccordionHeader>
          </NavItem>
          <AccordionContent className="p-xs grid gap-2xs">
            {route.children.map((child) => renderer(child))}
          </AccordionContent>
        </Accordion>
      );
    }

    return (
      <NavItem
        key={route.href}
        as="a"
        color={current === route.href ? "primary" : undefined}
        variant={current === route.href ? "subtle" : undefined}
        href={route.href}
      >
        <span className="text-body-md font-semibold underline underline-offset-4">
          {route.label}
        </span>
      </NavItem>
    );
  };

  return (
    <Box className={[className].filter(Boolean).join(" ")}>
      {routes.map((route) => {
        return renderer(route);
      })}
    </Box>
  );
}
