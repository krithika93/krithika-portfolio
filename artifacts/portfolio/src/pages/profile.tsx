import { motion } from "framer-motion";
import { LivingProfile } from "@/components/living-profile";
import { PageHead } from "@/components/page-head";
import { Callout } from "@/components/callout";

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
        className="text-4xl md:text-5xl font-bold mb-4"
        data-testid="text-profile-heading"
      >
        Profile
      </h1>

      <p
        className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl"
        data-testid="text-profile-tagline"
      >
        A running digest of what I've learned, plus my evolving identity as a learner —
        preferences, level, goals, and style.
      </p>

      <section
        className="mb-16 pt-10 border-t border-border"
        data-testid="section-about-me"
      >
        <h2
          className="text-3xl md:text-4xl font-bold mb-6"
          data-testid="heading-about-me"
        >
          About Me
        </h2>

        <div className="max-w-3xl mb-8">
          <Callout
            variant="apple-angle"
            title="Status — Research Case Study, Not an Implemented System"
          >
            <p className="mb-3">
              This page is a research case study: a synthesized architectural
              proposal that composes published methods (Qwen2.5-VL, NodeRAG, GRPO,
              NF4 QLoRA, Grounding DINO, and recent continuous-token reasoning
              work) into a system designed to close the Perception Gap under a
              16GB VRAM constraint. It is grounded in roughly ten papers from the
              latent-reasoning and VLM literature.
            </p>
            <p>
              Empirical work to date: a teacher-student distillation inference
              probe on a 2,000-image dataset (Kaggle notebook, available on
              request). The training pipeline (Stage 1 SFT + CSG, Stage 2
              VMR-RLVR with GRPO) is specified here but not yet implemented. I'm
              actively seeking collaborators with compute to take the next step.
            </p>
          </Callout>
        </div>

        <p
          className="text-lg leading-relaxed text-foreground mb-10 max-w-3xl font-medium"
          data-testid="text-about-lead"
        >
          I started building ViMET in February 2026 and I'm three months in, working solo.
          The work began with a concrete diagnosis: contextual association is the single
          hardest thing we ask a vision-language model to do, and the failure mode most
          current systems share. I'm open to collaborators, especially anyone working on
          edge-deployable VLMs or grounding under hardware constraints.
        </p>

        <div
          className="prose prose-lg dark:prose-invert max-w-3xl text-muted-foreground leading-relaxed"
          data-testid="text-about-body"
        >
          <figure
            className="mb-6 md:float-right md:ml-8 md:mb-4 md:w-64 md:mt-1 not-prose"
            data-testid="figure-noderag-diagram"
          >
            <img
              src={`${import.meta.env.BASE_URL}images/noderag-diagram.png`}
              alt="NodeRAG three-level abstraction diagram: physical attributes → relational context → conceptual meaning"
              className="w-full h-auto rounded-lg shadow-md ring-1 ring-border"
              loading="lazy"
              data-testid="img-noderag-diagram"
            />
            <figcaption className="mt-2 text-sm italic text-muted-foreground leading-snug">
              NodeRAG architecture: three-level abstraction bridging visual attributes
              to conceptual meaning
            </figcaption>
          </figure>
          <p>
            ViMET began as a diagnosis rather than a design. I started by analyzing
            where contemporary Vision-Language Models break down, and the pattern was
            consistent: contextual association — inferring an abstract concept from
            concrete visual cues that never literally contain it — is the category they
            handle worst. The ViMET paper quantifies exactly this, reporting that
            contextual associations remain the most challenging category for VLMs,
            yielding only 54.5% accuracy. That finding framed the entire project. The
            hardest sub-case is when the metonymic vehicle is a spatial arrangement
            rather than a discrete object: meaning then depends entirely on
            configurational context — how elements are positioned relative to one
            another — instead of on any single nameable thing. That observation is what
            motivated the NodeRAG-based approach at the core of ViMET, which represents a
            scene as a graph of elements and relations rather than a flat list of
            detected objects. That graph is built to reason across three levels of
            abstraction — from physical visual attributes, up through the relational
            context that binds them, to the conceptual and theological meaning the
            arrangement points toward. The field calls the underlying problem the
            Perception Gap, and it is the wall I set out to understand and, eventually,
            to design around.
          </p>
          <blockquote
            className="not-prose my-8 border-l-4 border-l-[#3D7BFF] dark:border-l-blue-300 bg-[#3D7BFF]/5 dark:bg-[#3D7BFF]/10 px-6 py-4 rounded-r-md md:clear-right"
            data-testid="pullquote-contextual-association"
          >
            <p className="text-xl md:text-2xl italic font-medium leading-snug text-[#1E3FA0] dark:text-blue-100">
              "Contextual associations remain the most challenging category for VLMs —
              only 54.5% accuracy."
            </p>
          </blockquote>
          <p>
            The failure is specific. A VLM can name every object in an image without
            flinching, yet it cannot make the leap from those particular pixels to an
            abstract concept the pixels never encoded. I call that boundary the Literal
            Wall. Reading across roughly ten papers in latent reasoning and adjacent VLM
            work — Qwen2.5-VL, NodeRAG, GRPO, NF4 QLoRA, Grounding DINO, and the
            emerging continuous-token-reasoning literature — I became convinced that
            latent reasoning is the direction small, on-device models will move next, and
            ViMET is my first attempt to argue precisely how.
          </p>
          <blockquote
            className="not-prose my-8 border-l-4 border-l-[#3D7BFF] dark:border-l-blue-300 bg-[#3D7BFF]/5 dark:bg-[#3D7BFF]/10 px-6 py-4 rounded-r-md md:clear-right"
            data-testid="pullquote-latent-reasoning-bet"
          >
            <p className="text-xl md:text-2xl italic font-medium leading-snug text-[#1E3FA0] dark:text-blue-100">
              "I'm betting that latent reasoning is the direction small, on-device
              models will move next."
            </p>
          </blockquote>
          <p>
            I designed the architecture against a single 16GB VRAM envelope, treated as
            the design spec from day one — the constraint any edge-deployable system has
            to respect. The empirical work happened on Kaggle's free notebooks in
            February 2026: a teacher-student distillation setup on a 2,000-image VIMET
            dataset with Qwen2.5-VL as the student. I hit two walls at once — repeated
            OOM cascades when teacher and student tried to share the 16GB envelope, and a
            59% inference-accuracy ceiling that showed the standard distillation recipe
            would not close the Perception Gap on its own. That result is what pivoted
            the project from brute-forcing an existing recipe to designing a new one.
          </p>
          <blockquote
            className="not-prose my-8 border-l-4 border-l-[#3D7BFF] dark:border-l-blue-300 bg-[#3D7BFF]/5 dark:bg-[#3D7BFF]/10 px-6 py-4 rounded-r-md md:clear-right"
            data-testid="pullquote-vram-envelope"
          >
            <p className="text-xl md:text-2xl italic font-medium leading-snug text-[#1E3FA0] dark:text-blue-100">
              "A single 16GB VRAM envelope, treated as the design spec from day one."
            </p>
          </blockquote>
          <p>
            The architecture I propose in the ViMET case study is the result of that
            pivot. Its training pipeline — Stage 1 SFT + CSG, Stage 2 VMR-RLVR with GRPO
            — is fully specified but not yet implemented, and that is the work I'm openly
            looking for collaborators on. My next chapter is to bring the same
            constraint-driven rigor to a team that builds interpretive systems on real
            hardware, where closing the Perception Gap is a product problem and not only
            a research one.
          </p>
        </div>
      </section>

      <LivingProfile />
    </motion.div>
  );
}
