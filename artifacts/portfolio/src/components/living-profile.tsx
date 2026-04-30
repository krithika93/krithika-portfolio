import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileData {
  profile?: string;
  summary?: string;
  updated_at?: number;
}

export function LivingProfile() {
  const [data, setData] = useState<ProfileData | null>(null);
  const url = import.meta.env.VITE_LIVING_PROFILE_URL;

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const json = await response.json();
          setData(json);
        }
      } catch {
        // silently ignore fetch failures — widget stays hidden
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, [url]);

  if (!url || !data || (!data.profile && !data.summary)) return null;

  const updatedLabel = data.updated_at
    ? new Date(data.updated_at * 1000).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  return (
    <Card className="mt-12 bg-muted/50 border-muted" data-testid="widget-living-profile">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Living Profile</CardTitle>
        {updatedLabel && (
          <p className="text-xs text-muted-foreground mt-1" data-testid="text-living-profile-updated">
            Last updated {updatedLabel}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-8">
        {data.summary && (
          <div data-testid="section-living-profile-summary">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{data.summary}</ReactMarkdown>
            </div>
          </div>
        )}
        {data.profile && (
          <div data-testid="section-living-profile-profile">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{data.profile}</ReactMarkdown>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
