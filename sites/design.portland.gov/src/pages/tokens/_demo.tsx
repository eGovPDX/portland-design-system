import { Heading } from "../../components/heading";
import { type HeadingParam } from "./_id";

export const BaseDemo = ({
  path,
  depth,
  children,
}: React.PropsWithChildren<Omit<HeadingParam, "value">>) => (
  <div key={path.join(".")}>
    <Heading depth={depth} id={path.join("-")}>
      {path.join(".")}
    </Heading>
    {children}
  </div>
);

export const VariantDemo = ({
  children,
  className = "mb-xl",
  count,
}: React.HTMLAttributes<HTMLDivElement> &
  React.PropsWithChildren<{ count: number }>) => {
  const classMap = new Map([
    ["2", "sm:grid-cols-2"],
    ["3", "sm:grid-cols-2 md:grid-cols-3"],
    ["4", "sm:grid-cols-2 md:grid-cols-4"],
  ]);

  const classes = classMap.get(count.toString()) || "";

  return (
    <div
      className={["grid gap-sm", classes, className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
};
