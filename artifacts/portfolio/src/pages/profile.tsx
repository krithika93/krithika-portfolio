import { motion } from "framer-motion";
import { PageHead } from "@/components/page-head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
  {
    id: "studied",
    title: "What I've Studied",
    source: "from studied",
    placeholder:
      "Coming soon — a curated list of the papers, courses, and frameworks that have shaped my research path. {TODO: wire to `studied` field}",
  },
  {
    id: "how-i-learn",
    title: "How I Learn",
    source: "from how_i_learn",
    placeholder:
      "Coming soon — my preferred modalities, mental models, and the rituals I use to internalize new concepts. {TODO: wire to `how_i_learn` field}",
  },
  {
    id: "where-im-heading",
    title: "Where I'm Heading",
    source: "extracted goals from how_i_learn",
    placeholder:
      "Coming soon — the open questions I'm chasing and the next milestones on my roadmap. {TODO: extract goals portion of `how_i_learn`}",
  },
];

export default function Profile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="container mx-auto px-4 md:px-8 py-16 max-w-4xl"
    >
      <PageHead
        title="Profile"
        description="A living view of what Krithika Rajendran has studied, how she learns, and where she's heading next."
        path="/profile"
      />

      <h1
        className="text-4xl md:text-5xl font-bold mb-6"
        data-testid="text-profile-heading"
      >
        Profile
      </h1>

      <p
        className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-3xl"
        data-testid="text-profile-tagline"
      >
        Three sections —{" "}
        <span className="text-foreground font-medium">What I've Studied</span> (from{" "}
        <code className="text-sm px-1.5 py-0.5 rounded bg-muted">studied</code>),{" "}
        <span className="text-foreground font-medium">How I Learn</span> (from{" "}
        <code className="text-sm px-1.5 py-0.5 rounded bg-muted">how_i_learn</code>),
        and{" "}
        <span className="text-foreground font-medium">Where I'm Heading</span>{" "}
        (extract the goals portion of{" "}
        <code className="text-sm px-1.5 py-0.5 rounded bg-muted">how_i_learn</code>
        ).
      </p>

      <div className="space-y-6">
        {sections.map((section) => (
          <Card
            key={section.id}
            className="bg-muted/40 border-muted"
            data-testid={`card-profile-${section.id}`}
          >
            <CardHeader>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <CardTitle
                  className="text-2xl font-bold"
                  data-testid={`heading-profile-${section.id}`}
                >
                  {section.title}
                </CardTitle>
                <span
                  className="text-xs uppercase tracking-wide text-muted-foreground"
                  data-testid={`source-profile-${section.id}`}
                >
                  {section.source}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p
                className="text-muted-foreground italic leading-relaxed"
                data-testid={`placeholder-profile-${section.id}`}
              >
                {section.placeholder}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
