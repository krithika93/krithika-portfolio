import { motion } from "framer-motion";

export default function Notes() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="container mx-auto px-4 md:px-8 py-16 max-w-4xl"
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-10" data-testid="text-notes-heading">Notes</h1>
      
      <div className="p-8 border border-dashed border-border rounded-lg bg-muted/20 text-center text-muted-foreground">
        &#123;TODO: needs source&#125;
      </div>
    </motion.div>
  );
}
