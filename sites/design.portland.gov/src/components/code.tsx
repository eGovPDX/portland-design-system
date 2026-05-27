import { Box } from "@cityofportland/components-react/box";
import { codeToHtml } from "shiki";
import React from "react";

export function Code({
  code,
  language = "javascript",
  theme = "github-dark",
  className,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  code: string;
  language?: string;
  theme?: string;
}) {
  const [html, setHtml] = React.useState("");

  React.useEffect(() => {
    async function highlight() {
      const highlighted = await codeToHtml(code.trim(), {
        theme,
        lang: language,
      });
      setHtml(highlighted);
    }
    highlight();
  }, [code, language, theme]);

  return (
    <Box as="pre" className={[className].filter(Boolean).join(" ")} {...props}>
      <code
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </Box>
  );
}
