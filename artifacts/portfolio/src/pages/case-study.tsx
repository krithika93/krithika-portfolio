import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHead } from "@/components/page-head";
import { Callout } from "@/components/callout";
import { DiagramFrame } from "@/components/diagram-frame";
import { Math } from "@/components/math";

const buildDate = new Date(__BUILD_DATE__).toLocaleDateString("en-US", {
  month: "long",
  year: "numeric",
});

const diagramSrc = `${import.meta.env.BASE_URL}diagrams/vimet-architecture.png`;

interface TocItem {
  id: string;
  label: string;
  children?: TocItem[];
}

const toc: TocItem[] = [
  { id: "executive-summary", label: "Executive Summary" },
  {
    id: "problem-landscape",
    label: "Problem Definition & Landscape Analysis",
    children: [
      { id: "problem", label: "Problem" },
      { id: "definitions", label: "Definitions" },
      { id: "landscape", label: "Landscape Analysis" },
    ],
  },
  {
    id: "proposed-solutions",
    label: "Proposed Solutions & Theoretical Framework",
    children: [
      { id: "core-pillars", label: "Core Architectural Pillars" },
      { id: "key-concepts", label: "Key Concepts Integrated" },
      { id: "theoretical-framework", label: "Theoretical Framework" },
    ],
  },
  {
    id: "workflow-stages",
    label: "SFT / RL Workflow Stages",
    children: [
      { id: "stages", label: "Stages 0 → 1 → 2" },
      { id: "principal-decisions", label: "Principal Decisions" },
      { id: "key-concepts-study", label: "Key Concepts Under Study" },
    ],
  },
  {
    id: "architecture-evaluation",
    label: "Architectural Diagram & Evaluation",
    children: [
      { id: "diagram", label: "Full Architectural Diagram" },
      { id: "evaluation-metrics", label: "Evaluation Metrics" },
      { id: "open-questions", label: "Aspects Yet to be Finalized" },
    ],
  },
];

interface StageCard {
  id: string;
  title: string;
  what: string;
  why: string;
  how: string;
}

const stageCards: StageCard[] = [
  {
    id: "stage-0",
    title: 'Stage 0 — "Offline Preprocessing & Target Synthesis"',
    what: "Run the unquantized 32B Teacher Model and Grounding DINO offline to extract high-fidelity teacher reasoning traces, attention trajectories, and Partially Literal Distractors via NodeRAG.",
    why: "Concentrating heavy preprocessing into a one-time offline pass keeps the 16 GB VRAM envelope free for student training and prevents OOM crashes during the online stages.",
    how: "Each artifact (teacher logits, ⟨lvr⟩ targets, distractor pool) is serialized to disk before the student model is loaded — the offline zone is fully unloaded before the online zone starts.",
  },
  {
    id: "stage-1",
    title: 'Stage 1 — "Supervised Fine-Tuning (SFT) & Curriculum Sensory Gating"',
    what: "Cold-start alignment phase that injects LoRA adapters into Qwen2.5-VL-3B-Instruct and forces reasoning through K=5 ⟨lvr⟩ tokens via a Tri-Loss objective.",
    why: "Establishes distributional alignment with the teacher and bootstraps the latent visual reasoning channel before any reinforcement signal is applied.",
    how: "r=64, α=128 LoRA on q/k/v/o + gate/up/down + embed_tokens & lm_head (UNFROZEN, weight-tied), 4-bit NF4 QLoRA, PagedAdamW8bit; CSG masks throttle direct text-to-image attention to enforce the cognitive prior.",
  },
  {
    id: "stage-2",
    title: 'Stage 2 — "Active Optimization via VMR-RLVR (GRPO)"',
    what: "Convert the model into an active agent that learns by contrast, using Group Relative Policy Optimization paired with a Dense Reward Evaluator.",
    why: "VMR collapses subjective generative tasks into objective A/B/C/D rewards against Partially Literal Distractors, removing reward hacking while preserving Reasoning by Contrast.",
    how: "Active Visual Perception + Advantage-Weighted Attention Divergence (AWAD) penalize literal shortcuts (Time vs. Age) and reward trajectories that traverse the NodeRAG semantic chain.",
  },
];

const principalDecisions = [
  { title: "Abandoning Text-Based CoT", body: "Entirely eliminating discrete English reasoning steps due to unavoidable hallucinatory drift and context dilution." },
  { title: "Selecting K=5 Latent Tokens", body: "Upgrading the bottleneck to exactly K=5 to mathematically align with the maximum of 5 Representamens naturally present in the ViMET dataset." },
  { title: "Rejecting Online 32B Distillation", body: "Shifting the 32B Teacher Model strictly to the offline zone to adhere to 16GB VRAM limits, ensuring the PagedAdamW8bit optimizer has a sufficient safety buffer." },
  { title: "Retaining NodeRAG over Pure RL", body: "Concluding that associative grounding requires predefined cognitive logic, meaning NodeRAG must be kept to provide explicit rules bridging literal signs to abstract concepts." },
  { title: "Implementing Unified On-Policy Distillation", body: "Reusing generated GRPO rollouts to calculate a reverse KL-divergence term, blending sparse RL accuracy rewards with dense teacher guidance." },
];

const keyConceptsUnderStudy = [
  { title: "Visual-Anchored Reward Shaping", body: "Calculating the ratio of internal attention assigned to visual tokens versus system tokens via Advantage-Weighted Attention Divergence (AWAD).", decision: "Determining the exact λ hyperparameters for the dense reward equation through incremental ablation." },
  { title: "Verifiable Multiple-Choice Reformulation (VMR)", body: "Converting subjective generative tasks into objective tasks against Partially Literal Distractors.", decision: "Designing the exact semantic distance used to generate distractors via ConceptNet to ensure genuine reasoning by contrast." },
  { title: "SFT Trace Filtering", body: "Removing poorly reasoned traces generated by the 32B teacher before initializing the 3B student.", decision: "Balancing the computational cost of rigorously filtering teacher traces against the performance penalty of training on partially noisy data." },
];

const evaluationFailureModes = [
  { title: "The Literal Trap", body: "The risk of the model exhibiting literal bias, prematurely binding semantic interpretation to a single concrete noun." },
  { title: "Lazy Attention Localization", body: "The tendency of models undergoing multimodal cold-start to distribute attention diffusely across system tokens rather than maintaining strong visual grounding." },
  { title: "NaN Cascades", body: "Catastrophic training failure caused by gradient interference in quantized precision, mitigated by torch.bfloat16 and Earth Mover's Distance." },
];

const openQuestions = [
  { title: "Hyperparameter Optimization for Dense Rewards", body: "The exact grid search methodology for determining the ideal lambda weights (λ) balancing the rewards (r_accuracy, r_format, r_crop, r_visual) is in validation." },
  { title: "Filtering Methodology for SFT Traces", body: "The automated logic to purge hallucinated, non-visually grounded CoT traces from the 32B offline teacher requires further empirical testing." },
  { title: "Optimal Distractor Proximity", body: "The precise algorithmic distance within the NodeRAG heterograph used to generate the \"Partially Literal Distractors\" must be finalized to ensure they promote deep exploration without breaking verifiable logic." },
];

function TocLink({ item, depth = 0 }: { item: TocItem; depth?: number }) {
  return (
    <>
      <a
        href={`#${item.id}`}
        className={
          depth === 0
            ? "text-sm font-medium text-foreground/90 hover:text-primary transition-colors py-1 leading-snug"
            : "text-xs text-muted-foreground hover:text-foreground transition-colors py-0.5 pl-3 leading-snug"
        }
        data-testid={`link-toc-${item.id}`}
      >
        {item.label}
      </a>
      {item.children?.map((child) => (
        <TocLink key={child.id} item={child} depth={depth + 1} />
      ))}
    </>
  );
}

export default function CaseStudy() {
  const githubUrl = import.meta.env.VITE_GITHUB_URL || "#";

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
            <nav className="flex flex-col space-y-0.5 border-l-2 border-border pl-4">
              {toc.map((item) => (
                <TocLink key={item.id} item={item} />
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl prose prose-slate dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary">
          {/* SECTION 1 — Executive Summary */}
          <section id="executive-summary" className="scroll-mt-24 mb-16">
            <h2 className="text-3xl mb-6">1. Executive Summary</h2>
            <aside
              className="not-prose mb-6 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 px-5 py-4 text-sm md:text-base leading-relaxed"
              data-testid="case-study-attribution"
            >
              <p className="m-0 text-slate-700 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-slate-100">Built on:</span>{" "}
                the ViMET dataset and the figurative-reasoning framework from Ghosh, Jiang &amp; Liu,{" "}
                <a
                  href="https://github.com/cincynlp/ViMET"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3D7BFF] dark:text-blue-300 underline underline-offset-2 hover:text-[#1E3FA0] dark:hover:text-blue-100"
                  data-testid="link-vimet-attribution"
                >
                  "A Computational Approach to Visual Metonymy," EACL 2026 (cincynlp/ViMET)
                </a>
                .
              </p>
            </aside>
            <p className="text-lg leading-relaxed">
              <strong>The Associative Reasoning Deficit:</strong> Vision-Language Models (VLMs) currently suffer from a massive 21% performance gap compared to human baselines (86.9% human vs. 65.9% VLM) when attempting to resolve Visual Metonymy.
            </p>
            <Callout variant="apple-angle" title="Apple Angle — Edge-Deployable from Day One">
              Latent Associative Grounding closes this gap inside a 16 GB VRAM envelope, making it viable for A-series Neural Engine targets via 4-bit NF4 QLoRA quantization.
            </Callout>
          </section>

          {/* SECTION 2 — Problem Definition & Landscape Analysis */}
          <section id="problem-landscape" className="scroll-mt-24 mb-16">
            <h2 className="text-3xl mb-6">2. Problem Definition & Landscape Analysis</h2>

            <h3 id="problem" className="scroll-mt-24 text-2xl mt-8 mb-4">Problem</h3>
            <div className="space-y-4 not-prose">
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

            <Callout variant="failure" title="Failure Cascade — The Curse of CoT">
              Curse of CoT → context dilution → hallucinatory drift → Lazy Attention Localization.
            </Callout>

            <h3 id="definitions" className="scroll-mt-24 text-2xl mt-8 mb-4">Definitions</h3>
            <ul className="space-y-3 list-disc pl-6">
              <li><strong>Visual Metonymy:</strong> A form of indirect communication where an image evokes a physically absent, abstract concept via associated visual cues rather than explicit depiction.</li>
              <li><strong>Associative Grounding:</strong> The cognitive and mathematical process of connecting literal visual cues (the Representamens) to the absent abstract concept, which requires external logical mapping to resolve controlled ambiguity.</li>
            </ul>

            <h3 id="landscape" className="scroll-mt-24 text-2xl mt-8 mb-4">Landscape Analysis</h3>
            <div className="overflow-x-auto pb-4 not-prose">
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
                    <td className="p-3 font-medium align-top">First-Generation Instruction-Tuned Models (e.g., LLaVA, InstructBLIP)</td>
                    <td className="p-3 align-top">Utilize simple MLP projectors for visual instruction tuning</td>
                    <td className="p-3 align-top">They excel at literal perception but exhibit severe literal bias, lacking the internal cognitive mechanics to connect literal signs to abstract objects.</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-medium align-top">Massive Generalist Proprietary Models (e.g., GPT-4o, Gemini 1.5 Pro)</td>
                    <td className="p-3 align-top">Rely on immense parameter scale and verbose text-based reasoning</td>
                    <td className="p-3 align-top">They succumb to the Curse of CoT, leading to Lazy Attention Localization where the model abandons visual evidence midway through a lengthy text sequence.</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-medium align-top">Modern Open-Weight Reasoning VLMs (e.g., DeepSeek-R1, QwQ)</td>
                    <td className="p-3 align-top">Utilize Reinforcement Learning with Verifiable Rewards (RLVR) for trial-and-error exploration</td>
                    <td className="p-3 align-top">When applied to subjective figurative language using sparse outcome rewards, they suffer from reward hacking, guessing the right concept based on language correlation while focusing on background noise.</td>
                  </tr>
                  <tr className="bg-primary/5 border-l-4 border-l-primary">
                    <td className="p-3 font-semibold text-primary align-top">Latent Associative Grounding</td>
                    <td className="p-3 align-top">Decouples reasoning from verbalization via continuous &lt;lvr&gt; tokens + NodeRAG</td>
                    <td className="p-3 align-top">Bridges the gap by maintaining maximum reasoning density while providing structured logic for subjective metonymic associations.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 3 — Proposed Solutions & Theoretical Framework */}
          <section id="proposed-solutions" className="scroll-mt-24 mb-16">
            <h2 className="text-3xl mb-6">3. Proposed Solutions & Theoretical Framework</h2>

            <h3 id="core-pillars" className="scroll-mt-24 text-2xl mt-8 mb-4">Core Architectural Pillars</h3>
            <ul className="space-y-3 list-disc pl-6">
              <li><strong>Latent Associative Grounding Architecture:</strong> Replacing discrete textual reasoning with K=5 continuous Latent Visual Reasoning (&lt;lvr&gt;) tokens acting as Visual Information Containers to mathematically compress visual evidence before generating an answer.</li>
              <li><strong>Verifiable Multiple-Choice Reformulation (VMR):</strong> Restructuring subjective, open-ended tasks into strict A/B/C/D multiple-choice formats using Partially Literal Distractors, enabling objective, deterministic rewards.</li>
              <li><strong>NodeRAG Integration:</strong> Supplying explicit cognitive priors by retrieving a fully nodalized taxonomy of Entities (N), Relationships (R), and Semantic Units (S) to establish the associative links between objects before visual processing begins.</li>
            </ul>

            <Callout variant="decision" title="Decision — The Superposition Correction">
              Because this is a fine-tuned pre-trained model (Qwen2.5-VL-3B-Instruct), the ⟨lvr⟩ tokens rely on Representational Flexibility to avoid the discretization bottleneck — not genuine superposition.
            </Callout>

            <h3 id="key-concepts" className="scroll-mt-24 text-2xl mt-8 mb-4">Key Concepts Integrated into the Solution</h3>
            <ul className="space-y-3 list-disc pl-6">
              <li><strong>Reasoning By Contrast — The Mathematical Architecture of Abstract Reasoning via Contrastive Learning:</strong> The model generates multiple trajectories that are evaluated within a deterministic multiple-choice environment via VMR to navigate "Hard Negatives". Through Group Relative Policy Optimization (GRPO), it mathematically penalizes the superficial shortcut (yielding a Negative Advantage or reward of 0) and reinforces the abstract leap (yielding a Positive Advantage or reward of +1). Ultimately, this forces the model to internalize logical boundaries and safely bypass literal bias.</li>
              <li><strong>Cognitive Priors and Architecture of Latent Reasoning:</strong> The framework establishes a "thinking before looking" paradigm to prevent shortcut learning and filter diffuse noise. This is concretely integrated through NodeRAG Graph Injection (providing explicitly structured logical rules), Concept-Conditioned Seeding (initializing the latent bottleneck with semantic search priors), and Curriculum Sensory Gating (CSG) (applying a mathematical mask to physically throttle direct text-to-image attention and enforce the prior).</li>
              <li><strong>NodeRAG Priors and Teacher Traces:</strong> The solution distinguishes and synergizes two foundational mechanisms. Cognitive priors (NodeRAG) supply the logical "why" (the abstract semantic links between objects) necessary for genuine associative grounding. Conversely, Teacher Reasoning Traces (from the offline 32B model) supply the mathematical "how" (high-fidelity attention trajectories and semantic vectors) to establish critical distributional alignment between the teacher and student during the initial SFT cold-start phase.</li>
            </ul>

            <h3 id="theoretical-framework" className="scroll-mt-24 text-2xl mt-8 mb-4">Theoretical Framework</h3>
            <ul className="space-y-3 list-disc pl-6">
              <li><strong>The Semiotic Triad:</strong> The framework operationalizes Peirce's Semiotic Triad, training the model to gather the Representamen (visual cues), process the Interpretant (the mental link) through latent tokens, and output the Object (the abstract concept).</li>
              <li><strong>Representational Flexibility Over Superposition:</strong> Because pre-trained models collapse superposed inputs into shortcut solutions early in the forward pass, the framework relies on the representational flexibility of continuous embeddings to express complex intermediate computations without the discretization bottleneck of English text.</li>
              <li><strong>Thinking Before Looking:</strong> Shifting the paradigm from passive consumption of visual noise to generating a cognitive prior through NodeRAG, guiding the model's gaze proactively to avoid shortcut learning.</li>
            </ul>
          </section>

          {/* SECTION 4 — SFT/RL Workflow Stages */}
          <section id="workflow-stages" className="scroll-mt-24 mb-16">
            <h2 className="text-3xl mb-6">4. SFT / RL Workflow Stages</h2>

            <div id="stages" className="scroll-mt-24 space-y-8 not-prose">
              {stageCards.map((stage) => (
                <article
                  key={stage.id}
                  className="rounded-lg border border-border bg-card p-6"
                  data-testid={`card-stage-${stage.id}`}
                >
                  <h3 className="text-lg font-semibold mb-4">{stage.title}</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    {(["what", "why", "how"] as const).map((field) => (
                      <div key={field}>
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                          {field}
                        </div>
                        <p className="text-sm leading-relaxed">{stage[field]}</p>
                      </div>
                    ))}
                  </div>

                  {stage.id === "stage-0" && (
                    <Callout variant="constraint" title="Constraint — NodeRAG Repositioned, Not Abandoned">
                      NodeRAG is moved offline to engineer Partially Literal Distractors for the VMR pool. This avoids OOM death spirals during online training while preserving the cognitive priors that bridge literal signs to abstract concepts.
                    </Callout>
                  )}

                  {stage.id === "stage-1" && (
                    <>
                      <Callout variant="decision" title="Decision — EMD over KL Divergence">
                        Wasserstein-1 (Earth Mover's Distance) replaces KL Divergence on sparse box targets to prevent NaN cascades under quantized precision.
                      </Callout>
                      <Callout variant="constraint" title="LoRA Configuration — The 16 GB Goldilocks Rank">
                        r=64, α=128 on q/k/v/o + gate/up/down + embed_tokens & lm_head (UNFROZEN, weight-tied). Combined with 4-bit NF4 QLoRA + PagedAdamW8bit, this is the rank that fits training and inference inside the 16 GB VRAM envelope.
                      </Callout>
                    </>
                  )}

                  {stage.id === "stage-2" && (
                    <Callout variant="decision" title="Decision — VMR Replaces LLM-as-a-Judge">
                      Verifiable Multiple-Choice Reformulation converts subjective generative tasks into objective A/B/C/D rewards against Partially Literal Distractors. No subjective judge, no reward hacking.
                    </Callout>
                  )}
                </article>
              ))}
            </div>

            <div className="mt-10 not-prose rounded-lg border border-border bg-muted/30 p-6">
              <h3 className="text-lg font-semibold mb-2">Dense Reward Equation</h3>
              <Math
                display
                tex="R_{\\text{total}} = \\lambda_1\\, r_{\\text{accuracy}} + \\lambda_2\\, r_{\\text{format}} + \\lambda_3\\, r_{\\text{crop}} + \\lambda_4\\, r_{\\text{visual}}"
              />
              <p className="text-sm leading-relaxed text-muted-foreground mt-3">
                Together, Advantage-Weighted Attention Divergence (AWAD) and Active Visual Perception force the model to practice <em>Reasoning by Contrast</em> against literal traps. Take the canonical Time vs. Age example: when an image of a wristwatch evokes both <em>Time</em> (the literal Representamen) and <em>Age</em> (the abstract metonym), the dense reward penalizes attention that lingers on the watch face and reinforces trajectories that traverse the NodeRAG semantic chain — wristwatch → wear → maturity → <em>Age</em>.
              </p>
            </div>

            <h3 id="principal-decisions" className="scroll-mt-24 text-2xl mt-12 mb-4">Principal Decisions Redirecting the Architecture</h3>
            <div className="grid gap-4 not-prose">
              {principalDecisions.map((item, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <p><strong>{item.title}:</strong> {item.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h3 id="key-concepts-study" className="scroll-mt-24 text-2xl mt-12 mb-4">Key Concepts Under Study and Required Decisions</h3>
            <div className="grid gap-4 not-prose">
              {keyConceptsUnderStudy.map((item, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <p className="mb-2"><strong>{item.title}:</strong> {item.body}</p>
                    <p className="text-sm text-muted-foreground"><em>Decision:</em> {item.decision}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* SECTION 5 — Architectural Diagram & Evaluation */}
          <section id="architecture-evaluation" className="scroll-mt-24 mb-16">
            <h2 className="text-3xl mb-6">5. Architectural Diagram & Evaluation</h2>

            <h3 id="diagram" className="scroll-mt-24 text-2xl mt-8 mb-4">Full Architectural Diagram</h3>
            <DiagramFrame
              src={diagramSrc}
              alt="ViMET Offline Preprocessing Zone vs Online Training Zone"
              caption="Resource Isolation Strategy: the Offline Preprocessing Zone (32B Teacher, Grounding DINO, NodeRAG) is fully unloaded before the Online Training Zone (SFT + CSG, then VMR-RLVR with GRPO) consumes the 16 GB VRAM envelope."
              downloadable
            />
            <ul className="not-prose text-sm text-muted-foreground space-y-1 -mt-2 mb-6">
              <li>Cream zone = Offline Preprocessing (executed once, before student training).</li>
              <li>Green zone = Online Training (Stage 1 SFT + CSG and Stage 2 VMR-RLVR loops).</li>
            </ul>

            <details className="not-prose rounded-lg border border-border bg-muted/30 p-4 mb-8">
              <summary className="cursor-pointer text-sm font-medium text-foreground/80 hover:text-foreground select-none">
                View as interactive Mermaid source
              </summary>
              <pre className="mt-3 overflow-x-auto rounded bg-background p-3 text-xs text-muted-foreground">
{`{TODO: paste Mermaid source}`}
              </pre>
            </details>

            <h3 id="evaluation-metrics" className="scroll-mt-24 text-2xl mt-8 mb-4">Evaluation Metrics and Failure Modes</h3>
            <ul className="space-y-3 list-disc pl-6 mb-6">
              <li><strong>Visual Focusing Score (S_focus):</strong> A critical process metric quantifying the percentage of internal attention mass that successfully concentrates on verified visual evidence (the Representamens).</li>
              <li><strong>Accuracy:</strong> The primary outcome metric measuring the success rate of resolving the correct abstract Object over the distractors in the VMR format.</li>
            </ul>
            {evaluationFailureModes.map((item) => (
              <Callout
                key={item.title}
                variant="failure"
                title={`Failure Mode — ${item.title}`}
              >
                {item.body}
              </Callout>
            ))}

            <h3 id="open-questions" className="scroll-mt-24 text-2xl mt-12 mb-4">Aspects Yet to be Finalized</h3>
            <div className="space-y-4 not-prose">
              {openQuestions.map((item, i) => (
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
