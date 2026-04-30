interface MermaidDiagramProps {
  source: string;
}

export function MermaidDiagram(_props: MermaidDiagramProps) {
  // TODO: render mermaid source on the client via mermaid.render().
  // Stubbed for now — when implemented, dynamically import "mermaid",
  // call mermaid.render() inside a useEffect, and inject the resulting
  // SVG into a ref'd container.
  return null;
}
