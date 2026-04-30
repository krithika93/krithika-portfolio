import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PROFILE_URL =
  import.meta.env.VITE_LIVING_PROFILE_URL ||
  "https://living.rkrithika.me/living-profile";

interface ProfileData {
  profile?: string;
  summary?: string;
  updated_at?: number;
}

export function LivingProfile() {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(PROFILE_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const json = (await response.json()) as ProfileData;
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const updatedLabel = data?.updated_at
    ? new Date(data.updated_at * 1000).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "never";

  return (
    <Card className="mt-12 bg-muted/50 border-muted" data-testid="widget-living-profile">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-3">
          <CardTitle className="text-xl font-bold">Living Profile</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={load}
            disabled={loading}
            aria-label="Refresh living profile"
            data-testid="button-refresh-living-profile"
          >
            <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <span
            className="text-xs text-muted-foreground"
            data-testid="text-living-profile-updated"
          >
            Updated {updatedLabel}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading && !data && (
          <p className="text-sm text-muted-foreground" data-testid="text-living-profile-loading">
            Loading living profile…
          </p>
        )}

        {error && (
          <p className="text-sm text-destructive" data-testid="text-living-profile-error">
            Couldn't load profile: {error}
          </p>
        )}

        {data && (
          <>
            {data.summary ? (
              <div
                className="prose prose-sm dark:prose-invert max-w-none"
                data-testid="section-living-profile-summary"
              >
                <ReactMarkdown>{data.summary}</ReactMarkdown>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No summary yet — keep chatting with DeepTutor.
              </p>
            )}

            {data.profile && (
              <details
                className="group mt-4 border-t border-muted pt-4"
                data-testid="details-living-profile-full"
              >
                <summary className="cursor-pointer text-sm font-medium text-foreground/80 hover:text-foreground select-none list-none flex items-center gap-1.5">
                  <span className="inline-block transition-transform group-open:rotate-90">
                    ›
                  </span>
                  Full profile
                </summary>
                <div className="prose prose-sm dark:prose-invert max-w-none mt-3">
                  <ReactMarkdown>{data.profile}</ReactMarkdown>
                </div>
              </details>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
