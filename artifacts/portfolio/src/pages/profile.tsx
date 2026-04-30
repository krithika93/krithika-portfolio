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

      <LivingProfile />
    </motion.div>
  );
}
