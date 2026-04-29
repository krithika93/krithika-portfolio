import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface TimelineProps {
  stages: {
    title: string;
    tooltip: string;
  }[];
}

export function Timeline({ stages }: TimelineProps) {
  return (
    <div className="relative my-12" data-testid="timeline-workflow">
      {/* Connecting line */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 hidden md:block" />
      
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 relative z-10">
        {stages.map((stage, i) => (
          <HoverCard key={i}>
            <HoverCardTrigger asChild>
              <div 
                className="flex-1 flex flex-col items-center group cursor-pointer bg-background md:bg-transparent"
                data-testid={`timeline-stage-${i}`}
              >
                <div className="w-4 h-4 rounded-full bg-primary mb-4 transition-transform group-hover:scale-125 border-4 border-background" />
                <h4 className="text-sm font-semibold text-center text-foreground max-w-[200px]">
                  {stage.title}
                </h4>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 text-sm" side="top">
              {stage.tooltip}
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
}
