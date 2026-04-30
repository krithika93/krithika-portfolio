import { type ReactNode } from "react";

type CalloutVariant = "apple-angle" | "decision" | "constraint" | "failure";

interface CalloutProps {
  variant: CalloutVariant;
  title: string;
  children: ReactNode;
}

const VARIANT_STYLES: Record<
  CalloutVariant,
  {
    chipLabel: string;
    border: string;
    bg: string;
    chip: string;
    title: string;
    body: string;
  }
> = {
  "apple-angle": {
    chipLabel: "🍎 Apple Angle",
    border: "border-l-[#0A0F2C] dark:border-l-blue-300",
    bg: "bg-[#FAF7F2] dark:bg-[#0A0F2C]/40",
    chip: "bg-[#0A0F2C] text-[#FAF7F2] dark:bg-blue-300 dark:text-[#0A0F2C]",
    title: "text-[#0A0F2C] dark:text-blue-100",
    body: "text-[#0A0F2C]/80 dark:text-blue-100/80",
  },
  decision: {
    chipLabel: "◆ Decision",
    border: "border-l-[#3D7BFF]",
    bg: "bg-[#3D7BFF]/5 dark:bg-[#3D7BFF]/10",
    chip: "bg-[#3D7BFF] text-white",
    title: "text-[#1E3FA0] dark:text-blue-200",
    body: "text-[#1E3FA0]/85 dark:text-blue-100/80",
  },
  constraint: {
    chipLabel: "⚠ Constraint",
    border: "border-l-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/20",
    chip: "bg-amber-500 text-white",
    title: "text-amber-900 dark:text-amber-200",
    body: "text-amber-900/80 dark:text-amber-100/80",
  },
  failure: {
    chipLabel: "✕ Failure Mode",
    border: "border-l-red-500",
    bg: "bg-red-50/70 dark:bg-red-950/15",
    chip: "bg-red-500 text-white",
    title: "text-red-900 dark:text-red-200",
    body: "text-red-900/80 dark:text-red-100/80",
  },
};

export function Callout({ variant, title, children }: CalloutProps) {
  const s = VARIANT_STYLES[variant];
  const testId = `callout-${variant}-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60)}`;

  return (
    <aside
      className={`my-6 rounded-lg border border-border border-l-4 ${s.border} ${s.bg} p-5 not-prose`}
      data-testid={testId}
      data-callout-variant={variant}
    >
      <div className="flex items-center gap-3 mb-2 flex-wrap">
        <span
          className={`px-2 py-0.5 rounded font-mono text-[11px] tracking-tight ${s.chip}`}
        >
          {s.chipLabel}
        </span>
        <h4 className={`font-semibold text-sm ${s.title}`}>{title}</h4>
      </div>
      <div className={`text-sm leading-relaxed ${s.body}`}>{children}</div>
    </aside>
  );
}
