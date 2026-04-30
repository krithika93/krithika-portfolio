import { motion } from "framer-motion";
import { PageHead } from "@/components/page-head";

export default function Vision() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="container mx-auto px-4 md:px-8 py-16 max-w-4xl"
    >
      <PageHead
        title="Vision & Future Work"
        description="Translating visual metonymy research into developer tooling and EdTech — Latent Associative Grounding applied to UI and workflow analysis."
        path="/vision"
      />
      <h1 className="text-4xl md:text-5xl font-bold mb-10" data-testid="text-vision-heading">Vision & Future Work</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-2xl font-medium leading-snug text-foreground mb-8" data-testid="text-vision-lead">
          Translating visual metonymy into Developer Tooling and EdTech.
        </p>
        
        <p className="text-muted-foreground leading-relaxed" data-testid="text-vision-body">
          My long-term research trajectory applies Latent Associative Grounding to UI and workflow analysis. By classifying screenshots, stack-traces, and CLI animations as Representamens of abstract concepts, I aim to generate 'visual metonymical charts' — accelerating the theory-to-implementation gap for engineers and helping them master complex frameworks instantly without the cognitive overload of text-heavy tutorials.
        </p>
      </div>
    </motion.div>
  );
}
