import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import StatusIndicator from "./StatusIndicator";
import { RecordingStatus as Status } from "@/lib/types";
import { Mic, Square } from "lucide-react";

const RecordingStatus = () => {
  const [status, setStatus] = useState<Status>("idle");

  const toggleRecording = () => {
    if (status === "idle") {
      setStatus("recording");
    } else if (status === "recording") {
      setStatus("processing");
      // Simulate processing
      setTimeout(() => setStatus("complete"), 2000);
    }
  };

  return (
    <Card className="p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <StatusIndicator status={status} />
        <Button
          onClick={toggleRecording}
          variant={status === "recording" ? "destructive" : "default"}
          className="transition-all duration-300"
        >
          {status === "recording" ? (
            <Square className="mr-2 h-4 w-4" />
          ) : (
            <Mic className="mr-2 h-4 w-4" />
          )}
          {status === "recording" ? "Stop" : "Start Recording"}
        </Button>
      </div>
    </Card>
  );
};

export default RecordingStatus;