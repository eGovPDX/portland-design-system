import { Box, type ReactBoxProps } from "../box";
import { mergeClasses } from "../utils";

type HeaderBrandingTypes = "a" | "div" | "span";

export const HeaderBranding = <E extends HeaderBrandingTypes>(
  props: ReactBoxProps<E>
) => {
  return (
    <Box
      {...props}
      as={props.as || "a"}
      className={mergeClasses(["header__branding"], props.className)}
    />
  );
};
