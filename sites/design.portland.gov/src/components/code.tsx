import { Box } from "@cityofportland/components-react/box";
import { codeToHtml, type ThemeRegistrationAny } from "shiki";
import React, { useEffect, useState } from "react";

export function Code({
  code,
  language = "javascript",
  theme = "github-dark",
  className,
  color: _color,
  ...props
}: React.HTMLAttributes<HTMLPreElement> & {
  code: string;
  language?: string;
  theme?: ThemeRegistrationAny | string;
}) {
  const [html, setHtml] = useState("");

  const classes = new Set<string>([]);

  className?.split(" ").forEach(classes.add);

  useEffect(() => {
    async function highlight() {
      const highlighted = await codeToHtml(code.trim(), {
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
        lang: language,
        structure: "inline",
        rootStyle: false,
      });
      setHtml(highlighted);
    }
    highlight();
  }, [code, language, theme]);

  return (
    <Box as="pre" className={[className].filter(Boolean).join(" ")} {...props}>
      <code
        className="shiki"
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </Box>
  );
}
