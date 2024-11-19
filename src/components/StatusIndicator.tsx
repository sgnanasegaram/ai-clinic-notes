import { cn } from "@/lib/utils";
import { RecordingStatus } from "@/lib/types";

interface StatusIndicatorProps {
  status: RecordingStatus;
  className?: string;
}

const StatusIndicator = ({ status, className }: StatusIndicatorProps) => {
  const getStatusColor = (status: RecordingStatus) => {
    switch (status) {
      case "recording":
        return "bg-medical-red animate-pulse";
      case "processing":
        return "bg-medical-mint animate-pulse";
      case "complete":
        return "bg-medical-green";
      default:
        return "bg-medical-charcoal";
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "h-3 w-3 rounded-full transition-colors duration-300",
          getStatusColor(status)
        )}
      />
      <span className="text-sm font-medium capitalize">{status}</span>
    </div>
  );
};

export default StatusIndicator;