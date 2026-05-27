import { Box } from "@cityofportland/components-react/box";

export const Heading = ({
  children,
  depth,
  ...rest
}: {
  depth: number;
} & React.HTMLAttributes<HTMLHeadingElement>) => (
  <Box as={`h${Math.min(depth, 6)}`} {...rest}>
    {children}
  </Box>
);
