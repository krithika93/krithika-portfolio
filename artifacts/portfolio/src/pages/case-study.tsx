import { motion } from "framer-motion";
import { Timeline } from "@/components/timeline";
import { CalloutCard } from "@/components/callout-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHead } from "@/components/page-head";
import architectureDiagram from "@/assets/architecture-diagram.png";

const buildDate = new Date(__BUILD_DATE__).toLocaleDateString("en-US", {
  month: "long",
  year: "numeric",
});

export default function CaseStudy() {
  const githubUrl = import.meta.env.VITE_GITHUB_URL || "#";

  const toc = [
    { id: "problem", label: "Problem" },
    { id: "definition", label: "Definition" },
    { id: "proposed-solutions", label: "Proposed Solutions and SFT/RL Workflow" },
    { id: "core-pillars", label: "Core Architectural Pillars" },
    { id: "key-concepts", label: "Key Concepts Integrated into the Solution" },
    { id: "workflow-stages", label: "Workflow Stages" },
    { id: "theoretical-framework", label: "Theoretical Framework" },
    { id: "technical-design", label: "Technical Design Specification" },
    { id: "principal-decisions", label: "Principal Decisions Redirecting the Architecture" },
    { id: "key-concepts-study", label: "Key Concepts Under Study and Required Decisions" },
    { id: "evaluation-metrics", label: "Evaluation Metrics and Failure Modes" },
    { id: "aspects-yet-to-be-finalized", label: "Aspects Yet to be Finalized" },
  ];

  const workflowStages = [
    {
      title: 'Stage 0 — "Offline Preprocessing & Target Synthesis"',
      tooltip: "Executing the unquantized 32B Teacher Model and Grounding DINO to extract high-fidelity semantic targets and attention trajectories, while engineering distractors via NodeRAG, saving them securely offline to prevent Out Of Memory (OOM) crashes."
    },
    {
      title: 'Stage 1 — "Supervised Fine-Tuning (SFT) & Curriculum Sensory Gating"',
      tooltip: "A cold-start alignment phase injecting LoRA adapters into the Qwen2.5-VL-3B-Instruct student model to establish distributional alignment using the teacher traces, forced through the <lvr> tokens via a Tri-Loss objective."
    },
    {
      title: 'Stage 2 — "Active Optimization via VMR-RLVR (GRPO)"',
      tooltip: "Transforming the model into an active agent using Group Relative Policy Optimization (GRPO) paired with a Dense Reward Evaluator to learn via Reasoning by Contrast."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="container mx-auto px-4 md:px-8 py-12 max-w-7xl"
    >
      <PageHead
        title="Visual Metonymy Case Study"
        description="How Latent Associative Grounding, VMR, and NodeRAG priors close the 21% gap between human and VLM performance on visual metonymy benchmarks."
        path="/case-study/visual-metonymy"
      />
      <div className="flex flex-col lg:flex-row gap-12 relative">
        {/* Sticky TOC */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 space-y-2">
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-muted-foreground">Contents</h4>
            <nav className="flex flex-col space-y-1.5 border-l-2 border-border pl-4">
              {toc.map((item) => (
                <a 
                  key={item.id} 
                  href={`#${item.id}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1 leading-snug"
                  data-testid={`link-toc-${item.id}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl prose prose-slate dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary">
          <section id="problem" className="scroll-mt-24 mb-16">
            <h2 className="text-3xl mb-6">Problem</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <p><strong>The Associative Reasoning Deficit:</strong> Vision-Language Models (VLMs) currently suffer from a massive 21% performance gap compared to human baselines (86.9% human vs. 65.9% VLM) when attempting to resolve Visual Metonymy.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p><strong>The Perception Gap:</strong> Current models experience a Perception Gap where they learn what to say through textual mimicry, but fail to learn where to look, resulting in blind guessing and reliance on language priors over verified visual evidence.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p><strong>The Curse of CoT:</strong> Forcing a model to generate verbose, text-based Chain-of-Thought (CoT) to solve visual tasks causes context dilution, pushing the original visual constraints out of focus and leading to hallucinatory drift.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section id="definition" className="scroll-mt-24 mb-16">
            <h2 className="text-3xl mb-6">Definition</h2>
            <ul className="space-y-3 list-disc pl-6">
              <li><strong>Visual Metonymy:</strong> A form of indirect communication where an image evokes a physically absent, abstract concept via associated visual cues rather than explicit depiction.</li>
              <li><strong>Associative Grounding:</strong> The cognitive and mathematical process of connecting literal visual cues (the Representamens) to the absent abstract concept, which requires external logical mapping to resolve controlled ambiguity.</li>
            </ul>
          </section>

          <section id="proposed-solutions" className="scroll-mt-24 mb-16">
            <h2 className="text-3xl mb-6">Proposed Solutions and SFT/RL Workflow</h2>
            
            <h3 id="core-pillars" className="scroll-mt-24 text-2xl mt-8 mb-4">Core Architectural Pillars</h3>
            <ul className="space-y-3 list-disc pl-6 mb-8">
              <li><strong>Latent Associative Grounding Architecture:</strong> Replacing discrete textual reasoning with K=5 continuous Latent Visual Reasoning (&lt;lvr&gt;) tokens acting as Visual Information Containers to mathematically compress visual evidence before generating an answer.</li>
              <li><strong>Verifiable Multiple-Choice Reformulation (VMR):</strong> Restructuring subjective, open-ended tasks into strict A/B/C/D multiple-choice formats using Partially Literal Distractors, enabling objective, deterministic rewards.</li>
              <li><strong>NodeRAG Integration:</strong> Supplying explicit cognitive priors by retrieving a fully nodalized taxonomy of Entities (N), Relationships (R), and Semantic Units (S) to establish the associative links between objects before visual processing begins.</li>
            </ul>

            <h3 id="key-concepts" className="scroll-mt-24 text-2xl mt-8 mb-4">Key Concepts Integrated into the Solution</h3>
            <ul className="space-y-3 list-disc pl-6 mb-8">
              <li><strong>Reasoning By Contrast — The Mathematical Architecture of Abstract Reasoning via Contrastive Learning:</strong> The model generates multiple trajectories that are evaluated within a deterministic multiple-choice environment via VMR to navigate "Hard Negatives". Through Group Relative Policy Optimization (GRPO), it mathematically penalizes the superficial shortcut (yielding a Negative Advantage or reward of 0) and reinforces the abstract leap (yielding a Positive Advantage or reward of +1). Ultimately, this forces the model to internalize logical boundaries and safely bypass literal bias.</li>
              <li><strong>Cognitive Priors and Architecture of Latent Reasoning:</strong> The framework establishes a "thinking before looking" paradigm to prevent shortcut learning and filter diffuse noise. This is concretely integrated through NodeRAG Graph Injection (providing explicitly structured logical rules), Concept-Conditioned Seeding (initializing the latent bottleneck with semantic search priors), and Curriculum Sensory Gating (CSG) (applying a mathematical mask to physically throttle direct text-to-image attention and enforce the prior).</li>
              <li><strong>NodeRAG Priors and Teacher Traces:</strong> The solution distinguishes and synergizes two foundational mechanisms. Cognitive priors (NodeRAG) supply the logical "why" (the abstract semantic links between objects) necessary for genuine associative grounding. Conversely, Teacher Reasoning Traces (from the offline 32B model) supply the mathematical "how" (high-fidelity attention trajectories and semantic vectors) to establish critical distributional alignment between the teacher and student during the initial SFT cold-start phase.</li>
            </ul>

            <h3 id="workflow-stages" className="scroll-mt-24 text-2xl mt-8 mb-4">Workflow Stages</h3>
            <Timeline stages={workflowStages} />

            <figure className="mt-8" data-testid="figure-architecture-diagram">
              <a
                href={architectureDiagram}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-border bg-white dark:bg-neutral-900 p-4 sm:p-6 overflow-hidden hover:border-primary/40 transition-colors"
                aria-label="Open full-size architecture diagram in a new tab"
                data-testid="link-architecture-diagram"
              >
                <img
                  src={architectureDiagram}
                  alt="End-to-end architecture diagram showing the SFT and RL workflow for the Visual Metonymy framework, including teacher-trace SFT cold-start, NodeRAG priors, latent visual reasoning tokens, curriculum sensory gating, and GRPO optimization."
                  className="w-full h-auto mx-auto block"
                  loading="lazy"
                />
              </a>
              <figcaption className="mt-3 text-sm text-muted-foreground text-center">
                End-to-end SFT &rarr; RL workflow for the Visual Metonymy framework. Click to open the full-size diagram.
              </figcaption>
            </figure>
          </section>

          <section id="theoretical-framework" className="scroll-mt-24 mb-16">
            <h2 className="text-3xl mb-6">Theoretical Framework</h2>
            <ul className="space-y-3 list-disc pl-6">
              <li><strong>The Semiotic Triad:</strong> The framework operationalizes Peirce's Semiotic Triad, training the model to gather the Representamen (visual cues), process the Interpretant (the mental link) through latent tokens, and output the Object (the abstract concept).</li>
              <li><strong>Representational Flexibility Over Superposition:</strong> Because pre-trained models collapse superposed inputs into shortcut solutions early in the forward pass, the framework relies on the representational flexibility of continuous embeddings to express complex intermediate computations without the discretization bottleneck of English text.</li>
              <li><strong>Thinking Before Looking:</strong> Shifting the paradigm from passive consumption of visual noise to generating a cognitive prior through NodeRAG, guiding the model's gaze proactively to avoid shortcut learning.</li>
            </ul>
          </section>

          <section id="technical-design" className="scroll-mt-24 mb-16">
            <h2 className="text-3xl mb-6">Technical Design Specification (Landscape Analysis & Research Proposal)</h2>
            <div className="overflow-x-auto pb-4">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="p-3 font-semibold w-1/4">Model Family</th>
                    <th className="p-3 font-semibold w-1/3">Approach</th>
                    <th className="p-3 font-semibold">Perception Gap</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-medium">First-Generation Instruction-Tuned Models (e.g., LLaVA, InstructBLIP)</td>
                    <td className="p-3">Utilize simple MLP projectors for visual instruction tuning</td>
                    <td className="p-3">They excel at literal perception but exhibit severe literal bias, lacking the internal cognitive mechanics to connect literal signs to abstract objects.</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-medium">Massive Generalist Proprietary Models (e.g., GPT-4o, Gemini 1.5 Pro)</td>
                    <td className="p-3">Rely on immense parameter scale and verbose text-based reasoning</td>
                    <td className="p-3">They succumb to the Curse of CoT, leading to Lazy Attention Localization where the model abandons visual evidence midway through a lengthy text sequence.</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-medium">Modern Open-Weight Reasoning VLMs (e.g., DeepSeek-R1, QwQ)</td>
                    <td className="p-3">Utilize Reinforcement Learning with Verifiable Rewards (RLVR) for trial-and-error exploration</td>
                    <td className="p-3">When applied to subjective figurative language using sparse outcome rewards, they suffer from reward hacking, guessing the right concept based on language correlation while focusing on background noise.</td>
                  </tr>
                  <tr className="bg-primary/5 border-l-4 border-l-primary">
                    <td className="p-3 font-semibold text-primary">Latent Associative Grounding</td>
                    <td className="p-3">Decouples reasoning from verbalization via continuous &lt;lvr&gt; tokens + NodeRAG</td>
                    <td className="p-3">Bridges the gap by maintaining maximum reasoning density while providing structured logic for subjective metonymic associations.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="principal-decisions" className="scroll-mt-24 mb-16">
            <h2 className="text-3xl mb-6">Principal Decisions Redirecting the Architecture</h2>
            <div className="grid gap-4">
              {[
                { title: "Abandoning Text-Based CoT", body: "Entirely eliminating discrete English reasoning steps due to unavoidable hallucinatory drift and context dilution." },
                { title: "Selecting K=5 Latent Tokens", body: "Upgrading the bottleneck to exactly K=5 to mathematically align with the maximum of 5 Representamens naturally present in the ViMET dataset." },
                { title: "Rejecting Online 32B Distillation", body: "Shifting the 32B Teacher Model strictly to the offline zone to adhere to 16GB VRAM limits, ensuring the PagedAdamW8bit optimizer has a sufficient safety buffer." },
                { title: "Retaining NodeRAG over Pure RL", body: "Concluding that associative grounding requires predefined cognitive logic, meaning NodeRAG must be kept to provide explicit rules bridging literal signs to abstract concepts." },
                { title: "Implementing Unified On-Policy Distillation", body: "Reusing generated GRPO rollouts to calculate a reverse KL-divergence term, blending sparse RL accuracy rewards with dense teacher guidance." }
              ].map((item, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <p><strong>{item.title}:</strong> {item.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="key-concepts-study" className="scroll-mt-24 mb-16">
            <h2 className="text-3xl mb-6">Key Concepts Under Study and Required Decisions</h2>
            <div className="grid gap-4">
              {[
                { title: "Visual-Anchored Reward Shaping", body: "Calculating the ratio of internal attention assigned to visual tokens versus system tokens via Advantage-Weighted Attention Divergence (AWAD).", decision: "Determining the exact λ hyperparameters for the dense reward equation through incremental ablation." },
                { title: "Verifiable Multiple-Choice Reformulation (VMR)", body: "Converting subjective generative tasks into objective tasks against Partially Literal Distractors.", decision: "Designing the exact semantic distance used to generate distractors via ConceptNet to ensure genuine reasoning by contrast." },
                { title: "SFT Trace Filtering", body: "Removing poorly reasoned traces generated by the 32B teacher before initializing the 3B student.", decision: "Balancing the computational cost of rigorously filtering teacher traces against the performance penalty of training on partially noisy data." }
              ].map((item, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <p className="mb-2"><strong>{item.title}:</strong> {item.body}</p>
                    <p className="text-sm text-muted-foreground"><em>Decision:</em> {item.decision}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="evaluation-metrics" className="scroll-mt-24 mb-16">
            <h2 className="text-3xl mb-6">Evaluation Metrics and Failure Modes</h2>
            
            <ul className="space-y-3 list-disc pl-6 mb-8">
              <li><strong>Visual Focusing Score (S_focus):</strong> A critical process metric quantifying the percentage of internal attention mass that successfully concentrates on verified visual evidence (the Representamens).</li>
              <li><strong>Accuracy:</strong> The primary outcome metric measuring the success rate of resolving the correct abstract Object over the distractors in the VMR format.</li>
            </ul>

            <div className="space-y-4">
              <CalloutCard 
                title="Failure Mode — The Literal Trap" 
                content="The risk of the model exhibiting literal bias, prematurely binding semantic interpretation to a single concrete noun." 
              />
              <CalloutCard 
                title="Failure Mode — Lazy Attention Localization" 
                content="The tendency of models undergoing multimodal cold-start to distribute attention diffusely across system tokens rather than maintaining strong visual grounding." 
              />
              <CalloutCard 
                title="Failure Mode — NaN Cascades" 
                content="Catastrophic training failure caused by gradient interference in quantized precision, mitigated by torch.bfloat16 and Earth Mover's Distance." 
              />
            </div>
          </section>

          <section id="aspects-yet-to-be-finalized" className="scroll-mt-24 mb-16">
            <h2 className="text-3xl mb-6">Aspects Yet to be Finalized</h2>
            <div className="space-y-4">
              {[
                { title: "Hyperparameter Optimization for Dense Rewards", body: "The exact grid search methodology for determining the ideal lambda weights (λ) balancing the rewards (r_accuracy, r_format, r_crop, r_visual) is in validation." },
                { title: "Filtering Methodology for SFT Traces", body: "The automated logic to purge hallucinated, non-visually grounded CoT traces from the 32B offline teacher requires further empirical testing." },
                { title: "Optimal Distractor Proximity", body: "The precise algorithmic distance within the NodeRAG heterograph used to generate the \"Partially Literal Distractors\" must be finalized to ensure they promote deep exploration without breaking verifiable logic." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 border rounded-lg bg-card">
                  <Badge variant="outline" className="h-6 shrink-0 border-amber-500/50 text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/20">Open Question</Badge>
                  <p className="text-sm"><strong>{item.title}:</strong> {item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-24 border-t pt-8 text-sm text-muted-foreground flex justify-between items-center">
            <span data-testid="text-casestudy-lastreviewed">Last reviewed: {buildDate}</span>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors text-primary" data-testid="link-casestudy-discuss">
              Discuss this on GitHub
            </a>
          </div>
        </main>
      </div>
    </motion.div>
  );
}
