import katex from "katex";
import "katex/dist/katex.min.css";
import { useMemo } from "react";

interface MathProps {
  tex: string;
  display?: boolean;
}

export function Math({ tex, display = false }: MathProps) {
  const html = useMemo(
    () =>
      katex.renderToString(tex, {
        displayMode: display,
        throwOnError: false,
        strict: true,
        output: "html",
      }),
    [tex, display],
  );

  return (
    <span
      className={display ? "block my-4 text-center overflow-x-auto" : "inline"}
      data-testid={display ? "math-display" : "math-inline"}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
