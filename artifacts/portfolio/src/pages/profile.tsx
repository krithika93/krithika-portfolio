import { motion } from "framer-motion";
import { LivingProfile } from "@/components/living-profile";
import { PageHead } from "@/components/page-head";

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
          <p>
            ViMET didn't start in a whitepaper. It started on June 19, 2025, on a walk to
            the library, when I spent several minutes tracking a female Northern Cardinal —
            the pale brown plumage, the sudden flash of red in her crest, the way the
            light caught her when she finally settled and let me take the photo. I wasn't
            looking at a bird. I was looking at three small, literal cues that had somehow
            added up, in my head, to grace. The bird was the sign. The meaning was
            somewhere else entirely. I walked the rest of the way to the library already
            knowing that whatever name this had, I was going to spend the next year of my
            life building a model that could do it.
          </p>
          <p>
            That's the gap the field calls the Perception Gap, and it's the one current
            Vision-Language Models hit a wall against. They can name the bird in my photo
            without flinching. They cannot make the leap from those specific feathers in
            that specific light to an abstract concept the pixels never contained. I
            started calling that wall the Literal Wall, and the architecture that became
            ViMET — Latent Associative Grounding, the K=5 ⟨lvr⟩ tokens, Verifiable
            Multiple-Choice Reformulation against Partially Literal Distractors — is,
            underneath all of it, one long attempt to teach a small model to make the
            leap I made on the way to the library.
          </p>
          <p>
            I built it single-handedly, in a "perpetual beta" mindset — ship, measure,
            refine, repeat — under a constraint I refused to relax: a single 16GB VRAM
            envelope. That number is not a flex. A year ago I couldn't afford a 16GB
            laptop. The constraint is the machine I now own, and the discipline of
            fitting an entire research pipeline inside it is partly engineering and
            partly a way of keeping faith with where I came from. The grind pushed me
            well past my comfort zones — OOM cascades, NaN explosions on sparse box
            targets, the curse of CoT diluting attention into hallucinatory drift — but
            the constraint was the gift. Every obstacle forced an architectural decision
            instead of a workaround, and those decisions are what the case study
            documents. I am, by temperament, a continuous learner who cares about
            incremental consistency more than about breakthroughs; ViMET is what happens
            when that temperament meets a problem worth twelve months of patience.
          </p>
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
            Paramatma's instruction. The twelve months after it were the response. ViMET
            is my comeback — a launchpad, not a destination — and I care less about the
            result than about the legacy of the contribution and the personal
            fulfillment of working on a problem that actually interests me. My next
            chapter is to bring that same constraint-driven, lived-in rigor to a place
            that builds interpretive systems on real hardware. Apple is the room I have
            in mind.
          </p>
        </div>
      </section>

      <LivingProfile />
    </motion.div>
  );
}
