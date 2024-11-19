import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TranscriptionSegment } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TranscriptionPreviewProps {
  segments: TranscriptionSegment[];
}

const TranscriptionPreview = ({ segments }: TranscriptionPreviewProps) => {
  return (
    <Card className="h-[400px] p-4">
      <ScrollArea className="h-full pr-4">
        {segments.map((segment) => (
          <div
            key={segment.id}
            className={cn(
              "mb-4 rounded-lg p-3 transition-all duration-300",
              segment.speaker === "doctor"
                ? "ml-8 bg-medical-mint/10"
                : "mr-8 bg-medical-charcoal/5"
            )}
          >
            <div className="mb-1 text-xs font-medium text-medical-charcoal/60">
              {segment.speaker === "doctor" ? "Læge" : "Patient"}
            </div>
            <p className="text-sm leading-relaxed">{segment.text}</p>
          </div>
        ))}
      </ScrollArea>
    </Card>
  );
};

export default TranscriptionPreview;