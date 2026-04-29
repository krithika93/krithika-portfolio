import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Builder() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="container mx-auto px-4 md:px-8 py-16 max-w-6xl"
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-12" data-testid="text-builder-heading">Builder's Mindset</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="bg-card shadow-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Architecture & Training</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li>Reinforcement Learning (GRPO, RLVR)</li>
              <li>LoRA / QLoRA Optimization</li>
              <li>Reward Shaping (AWAD)</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-card shadow-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Data & Knowledge Graphs</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li>NodeRAG</li>
              <li>ConceptNet</li>
              <li>Grounding DINO (Automated Trajectory Synthesis)</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-card shadow-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Systems & Deployment</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li>VRAM Lifecycle Management</li>
              <li>4-bit NF4 Quantization</li>
              <li>PagedAdamW8bit</li>
              <li>Apple A-series Neural Engine profiles</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="p-8 border-l-4 border-l-primary bg-primary/5 rounded-r-lg" data-testid="text-builder-callout">
        <p className="text-xl md:text-2xl font-medium leading-relaxed text-foreground/90">
          "I believe artificial intelligence is bottlenecked by text, not by scale. By forcing complex reasoning through a K=5 latent bottleneck within a 16GB VRAM envelope, I optimize for representational flexibility over brute compute. I design for the edge."
        </p>
      </div>
    </motion.div>
  );
}
