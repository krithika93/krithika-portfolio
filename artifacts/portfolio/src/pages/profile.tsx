import { motion } from "framer-motion";
import { LivingProfile } from "@/components/living-profile";
import { PageHead } from "@/components/page-head";
import { Callout } from "@/components/callout";
import cardinalWalkImage from "@assets/3c6ba7fc-9566-49c4-ad66-897d4c970bc0_1777568745429.JPG";

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
          The intuition came earlier — a walk in June 2025 — and the vocabulary came later,
          when I stumbled on the Visual Metonymy literature in December 2025 while reading
          the work of professors I wanted to study under. I'm open to collaborators,
          especially anyone working on edge-deployable VLMs or grounding under hardware
          constraints.
        </p>

        <div
          className="prose prose-lg dark:prose-invert max-w-3xl text-muted-foreground leading-relaxed"
          data-testid="text-about-body"
        >
          <figure
            className="mb-6 md:float-right md:ml-8 md:mb-4 md:w-64 md:mt-1 not-prose"
            data-testid="figure-cardinal-walk"
          >
            <img
              src={cardinalWalkImage}
              alt="A female Northern Cardinal among pink blossoms — the photograph from the June 19, 2025 walk to the library that became the seed of ViMET."
              className="w-full h-auto rounded-lg shadow-md ring-1 ring-border"
              loading="lazy"
              data-testid="img-cardinal-walk"
            />
            <figcaption className="mt-2 text-sm italic text-muted-foreground leading-snug">
              The Cardinal walk — June 19, 2025. Three small literal cues that
              somehow added up to grace.
            </figcaption>
          </figure>
          <p>
            ViMET didn't start in a whitepaper. It started on June 19, 2025, on a walk to
            the library, when I spent several minutes tracking a female Northern Cardinal —
            the pale brown plumage, the sudden flash of red in her crest, the way the
            light caught her when she finally settled and let me take the photo. I wasn't
            looking at a bird. I was looking at three small, literal cues that had somehow
            added up, in my head, to grace. The bird was the sign. The meaning was
            somewhere else entirely. I walked the rest of the way to the library already
            knowing that whatever name this had, I wanted to spend the next phase of my
            life on it.
          </p>
          <blockquote
            className="not-prose my-8 border-l-4 border-l-[#3D7BFF] dark:border-l-blue-300 bg-[#3D7BFF]/5 dark:bg-[#3D7BFF]/10 px-6 py-4 rounded-r-md md:clear-right"
            data-testid="pullquote-bird-was-sign"
          >
            <p className="text-xl md:text-2xl italic font-medium leading-snug text-[#1E3FA0] dark:text-blue-100">
              "The bird was the sign. The meaning was somewhere else entirely."
            </p>
          </blockquote>
          <p>
            That's the gap the field calls the Perception Gap, and it's the one current
            Vision-Language Models hit a wall against. They can name the bird in my photo
            without flinching. They cannot make the leap from those specific feathers in
            that specific light to an abstract concept the pixels never contained. I
            started calling that wall the Literal Wall. In December 2025 I stumbled on
            the Visual Metonymy literature while reading the work of professors I wanted
            to study under, and the field gave me a name for what I'd already been
            turning over for six months. From there I spent the early months of 2026
            reading roughly ten papers in latent reasoning and adjacent VLM work —
            Qwen2.5-VL, NodeRAG, GRPO, NF4 QLoRA, Grounding DINO, and the emerging
            continuous-token-reasoning literature — and writing the architectural
            argument that became the ViMET case study. I'm betting that latent reasoning
            is the direction small, on-device models will move next, and ViMET is my
            first attempt to argue precisely how.
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
            I wrote the case study end-to-end alone, working in a "perpetual beta"
            mindset — read, argue, refine, repeat — under a constraint I treated as the
            design spec from day one: a single 16GB VRAM envelope. That number is not a
            flex. A year ago I couldn't afford a 16GB laptop. The constraint is the
            machine I now own, and designing the entire architecture to fit inside it is
            partly engineering and partly a way of keeping faith with where I came from.
            The empirical work so far is a teacher-student distillation inference probe
            I ran on a 2,000-image dataset in a Kaggle notebook — a first concrete look
            at whether the architectural intuitions hold under real images. The training
            pipeline itself is not yet implemented; that's the next phase, and it's the
            work I'm openly looking for collaborators on. I am, by temperament, a
            continuous learner who cares about incremental consistency more than about
            breakthroughs; ViMET is what happens when that temperament meets a problem
            worth a year of careful argument.
          </p>
          <blockquote
            className="not-prose my-8 border-l-4 border-l-[#3D7BFF] dark:border-l-blue-300 bg-[#3D7BFF]/5 dark:bg-[#3D7BFF]/10 px-6 py-4 rounded-r-md md:clear-right"
            data-testid="pullquote-not-a-flex"
          >
            <p className="text-xl md:text-2xl italic font-medium leading-snug text-[#1E3FA0] dark:text-blue-100">
              "That number is not a flex. A year ago I couldn't afford a 16GB
              laptop."
            </p>
          </blockquote>
          <p>
            I should say one more thing, because it's the truest part. On the morning of
            June 19, I had been chanting for about five hours. I wasn't planning to walk
            to the library that day. The walk arrived as a quiet pull from the heart —
            not a thought, not a plan, a force — and I went without stalling. In Hare
            Krishna practice, that inner instruction has a name: Paramatma, the
            Supersoul, the witness seated in the heart who guides when you've quieted
            yourself enough to hear. I am a Hare Krishna, and the discipline I bring to
            research is the same discipline I bring to my practice: chant, listen for
            Paramatma, work in detachment, and stop performing for an audience that
            isn't the one you're actually accountable to. The Cardinal walk was
            Paramatma's instruction. The months after it were the response. ViMET is my
            comeback — a launchpad, not a destination — and I care less about the result
            than about the legacy of the contribution and the personal fulfillment of
            working on a problem that actually interests me. My next chapter is to bring
            that same constraint-driven, lived-in rigor to a place that builds
            interpretive systems on real hardware. Apple is the room I have in mind.
          </p>
        </div>
      </section>

      <LivingProfile />
    </motion.div>
  );
}
