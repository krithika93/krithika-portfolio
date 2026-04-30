import * as Dialog from "@radix-ui/react-dialog";
import { Download, X, ZoomIn } from "lucide-react";
import { useState } from "react";

interface DiagramFrameProps {
  src: string;
  alt: string;
  caption: string;
  downloadable?: boolean;
}

export function DiagramFrame({ src, alt, caption, downloadable = false }: DiagramFrameProps) {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const filename = src.split("/").pop() ?? "diagram.png";

  if (failed) {
    return (
      <figure className="my-8 not-prose" data-testid="diagram-frame-placeholder">
        <div
          className="aspect-[16/10] w-full rounded-lg border-2 border-dashed border-border bg-muted/30 flex items-center justify-center text-center px-6"
          role="img"
          aria-label={`${alt} (image not yet uploaded)`}
        >
          <p className="text-sm text-muted-foreground">
            ⏳ {filename} not yet uploaded — drop into <code className="font-mono text-xs">/public/diagrams/</code>
          </p>
        </div>
        <figcaption className="mt-3 text-sm text-muted-foreground text-center">
          {caption}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="my-8 not-prose" data-testid="diagram-frame">
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button
            type="button"
            className="group relative block w-full rounded-lg border border-border bg-white dark:bg-neutral-900 p-4 sm:p-6 overflow-hidden hover:border-primary/40 transition-colors cursor-zoom-in"
            aria-label={`Zoom into diagram: ${alt}`}
            data-testid="button-diagram-zoom"
          >
            <img
              src={src}
              alt={alt}
              className="w-full h-auto mx-auto block"
              loading="lazy"
              onError={() => setFailed(true)}
            />
            <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-background/85 backdrop-blur px-2 py-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="h-3.5 w-3.5" />
              Zoom
            </span>
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <Dialog.Content
            className="fixed inset-0 z-50 flex flex-col items-stretch p-4 sm:p-8 focus:outline-none"
            data-testid="dialog-diagram-fullscreen"
          >
            <Dialog.Title className="sr-only">{alt}</Dialog.Title>
            <Dialog.Description className="sr-only">{caption}</Dialog.Description>

            <div className="flex justify-end gap-2 mb-3">
              {downloadable && (
                <a
                  href={src}
                  download={filename}
                  className="inline-flex items-center gap-1.5 rounded-md bg-white/10 hover:bg-white/20 backdrop-blur px-3 py-1.5 text-sm text-white transition-colors"
                  data-testid="link-diagram-download-overlay"
                >
                  <Download className="h-4 w-4" />
                  Download PNG
                </a>
              )}
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-md bg-white/10 hover:bg-white/20 backdrop-blur px-3 py-1.5 text-sm text-white transition-colors"
                  aria-label="Close fullscreen"
                  data-testid="button-diagram-close"
                >
                  <X className="h-4 w-4" />
                  Close
                </button>
              </Dialog.Close>
            </div>

            <div className="flex-1 overflow-auto rounded-lg bg-white dark:bg-neutral-900 p-4">
              <img src={src} alt={alt} className="w-full h-auto mx-auto block" />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <figcaption className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm text-muted-foreground">
        <span className="leading-snug">{caption}</span>
        {downloadable && (
          <a
            href={src}
            download={filename}
            className="inline-flex items-center gap-1 shrink-0 text-primary hover:underline"
            data-testid="link-diagram-download"
          >
            <Download className="h-3.5 w-3.5" />
            Download PNG
          </a>
        )}
      </figcaption>
    </figure>
  );
}
