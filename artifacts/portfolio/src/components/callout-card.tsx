interface CalloutCardProps {
  title: string;
  content: string;
}

export function CalloutCard({ title, content }: CalloutCardProps) {
  return (
    <div 
      className="rounded-lg border border-red-500/20 bg-red-50/50 dark:bg-red-950/10 p-6 my-4"
      data-testid={`card-callout-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs font-semibold uppercase tracking-wide">
          Failure Mode
        </span>
        <h4 className="font-semibold text-red-900 dark:text-red-200">
          {title.replace("Failure Mode — ", "")}
        </h4>
      </div>
      <p className="text-sm text-red-800/80 dark:text-red-200/80 leading-relaxed">
        {content}
      </p>
    </div>
  );
}
