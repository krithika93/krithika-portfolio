import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHead } from "@/components/page-head";

export default function Landing() {
  const githubUrl = import.meta.env.VITE_GITHUB_URL || "#";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="container mx-auto px-4 md:px-8 py-16 md:py-24 max-w-6xl"
    >
      <PageHead
        title="Krithika Rajendran"
        description="AI/ML Researcher and Engineer specializing in hardware-aware multimodal architectures. Bridging the 21% gap between human and VLM associative reasoning."
        path="/"
      />
      <section className="mb-24 text-center md:text-left">
        <h1 
          className="text-[clamp(2.5rem,5vw,5rem)] font-bold text-foreground leading-tight tracking-tight mb-6"
          data-testid="text-hero-headline"
        >
          Bridging the Perception Gap: Latent Reasoning for Edge-Deployed AI.
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-4xl" data-testid="text-hero-subheadline">
          AI/ML Researcher and Engineer specializing in hardware-aware multimodal architectures. I transition complex cognitive theories (like visual metonymy) into deployable, low-latency systems under strict edge constraints — 16GB VRAM, A-series Neural Engines.
        </p>
        <p className="text-lg md:text-xl font-medium mb-10 max-w-3xl text-foreground/80" data-testid="text-hero-oneliner">
          I close the 21% gap between human and VLM associative reasoning — by replacing verbose Chain-of-Thought with K=5 latent tokens, grounded in NodeRAG priors.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center md:justify-start">
          <Link href="/case-study/visual-metonymy">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto" data-testid="button-cta-casestudy">
              Read the Visual Metonymy case study
            </Button>
          </Link>
          <Button variant="outline" size="lg" asChild className="w-full sm:w-auto" data-testid="button-cta-github">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground/80 text-center md:text-left" data-testid="text-hero-proof">
          Human baseline 86.9% · VLM baseline 65.9% · the 21-point gap is what I work on.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        <Card className="bg-card hover:shadow-md transition-shadow" data-testid="card-pillar-researcher">
          <CardHeader>
            <CardTitle>Researcher</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            I operationalize Peirce's Semiotic Triad in vision-language models, treating Representamen → Interpretant → Object as a trainable architecture, not a metaphor.
          </CardContent>
        </Card>
        <Card className="bg-card hover:shadow-md transition-shadow" data-testid="card-pillar-engineer">
          <CardHeader>
            <CardTitle>Engineer</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            I design under hard constraints: 16GB VRAM, 4-bit NF4 quantization, PagedAdamW8bit. Constraint-driven engineering is the work, not the obstacle.
          </CardContent>
        </Card>
        <Card className="bg-card hover:shadow-md transition-shadow" data-testid="card-pillar-builder">
          <CardHeader>
            <CardTitle>Builder</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            I ship reasoning models for the edge — Qwen2.5-VL-3B with LoRA adapters, GRPO rollouts, and a Tri-Loss objective trained against verifiable multiple-choice rewards.
          </CardContent>
        </Card>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4" data-testid="text-focus-heading">
          Currently focused on
        </h3>
        <div className="flex flex-wrap gap-3">
          {["Latent Visual Reasoning (<lvr>) tokens", "NodeRAG cognitive priors", "VMR-RLVR with GRPO", "Apple Neural Engine deployment"].map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 text-sm font-medium"
              data-testid={`tag-focus-${tag.replace(/\s+/g, '-').toLowerCase()}`}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
