import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileData {
  studied?: string;
  learn?: string;
  heading?: string;
}

export function LivingProfile() {
  const [data, setData] = useState<ProfileData | null>(null);
  const url = import.meta.env.VITE_DEEPTUTOR_URL;

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/living-profile`);
        if (response.ok) {
          const json = await response.json();
          setData(json);
        }
      } catch (error) {
        console.error("Failed to fetch living profile", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, [url]);

  if (!url || !data) return null;

  return (
    <Card className="mt-12 bg-muted/50 border-muted" data-testid="widget-living-profile">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Living Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {data.studied && (
          <div>
            <h4 className="font-semibold mb-2">What I've Studied</h4>
            <div className="prose prose-sm dark:prose-invert">
              <ReactMarkdown>{data.studied}</ReactMarkdown>
            </div>
          </div>
        )}
        {data.learn && (
          <div>
            <h4 className="font-semibold mb-2">How I Learn</h4>
            <div className="prose prose-sm dark:prose-invert">
              <ReactMarkdown>{data.learn}</ReactMarkdown>
            </div>
          </div>
        )}
        {data.heading && (
          <div>
            <h4 className="font-semibold mb-2">Where I'm Heading</h4>
            <div className="prose prose-sm dark:prose-invert">
              <ReactMarkdown>{data.heading}</ReactMarkdown>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
