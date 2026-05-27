export function NavTitle({
  level,
  children,
}: {
  level: number;
  children: React.ReactNode;
}) {
  const Tag = `h${level}` as React.ElementType;
  return <Tag>{children}</Tag>;
}
