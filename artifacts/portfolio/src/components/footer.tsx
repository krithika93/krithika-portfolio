import { useState } from "react";
import { Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

const buildDate = new Date(__BUILD_DATE__).toLocaleDateString("en-US", {
  month: "short",
  year: "numeric",
});

export function Footer() {
  const email = import.meta.env.VITE_CONTACT_EMAIL;
  const github = import.meta.env.VITE_GITHUB_URL;
  const linkedin = import.meta.env.VITE_LINKEDIN_URL;
  const currentYear = new Date(__BUILD_DATE__).getFullYear();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast({
        title: "Email copied",
        description: `${email} is on your clipboard.`,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Couldn't copy",
        description: "Try selecting the address manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="w-full border-t py-8 mt-16 bg-background">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
        <div
          className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3"
          data-testid="text-footer-copyright"
        >
          <span>© {currentYear} Krithika Rajendran</span>
          <span className="hidden sm:inline text-muted-foreground/40">·</span>
          <span
            className="text-muted-foreground/60 text-xs"
            data-testid="text-footer-builddate"
          >
            Built {buildDate}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          {email && (
            <div
              className="inline-flex items-center gap-1 rounded-full border bg-muted/30 pl-3 pr-1 py-1"
              data-testid="group-footer-email"
            >
              <Mail className="h-3.5 w-3.5 text-muted-foreground/80" aria-hidden="true" />
              <a
                href={`mailto:${email}`}
                className="text-foreground/90 hover:text-foreground transition-colors font-medium"
                data-testid="link-footer-email"
              >
                {email}
              </a>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleCopy}
                    aria-label={copied ? "Email copied" : "Copy email address"}
                    className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground"
                    data-testid="button-footer-copy-email"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  {copied ? "Copied!" : "Copy email"}
                </TooltipContent>
              </Tooltip>
            </div>
          )}
          <div className="flex items-center gap-3">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border bg-muted/30 px-3 py-1 text-foreground/90 hover:text-foreground hover:bg-muted/60 transition-colors font-medium"
                data-testid="link-footer-github"
              >
                <Github className="h-3.5 w-3.5 text-muted-foreground/80" aria-hidden="true" />
                GitHub
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border bg-muted/30 px-3 py-1 text-foreground/90 hover:text-foreground hover:bg-muted/60 transition-colors font-medium"
                data-testid="link-footer-linkedin"
              >
                <Linkedin className="h-3.5 w-3.5 text-muted-foreground/80" aria-hidden="true" />
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
