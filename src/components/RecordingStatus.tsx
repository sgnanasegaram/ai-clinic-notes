import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import StatusIndicator from "./StatusIndicator";
import { RecordingStatus as Status } from "@/lib/types";
import { Mic, Square } from "lucide-react";
import { storeRecording } from "@/lib/storage";
import { useToast } from "@/components/ui/use-toast";

const RecordingStatus = () => {
  const [status, setStatus] = useState<Status>("idle");
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      
      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(chunks.current, { type: 'audio/webm' });
        const recordingId = await storeRecording(audioBlob);
        
        // Clean up
        chunks.current = [];
        stream.getTracks().forEach(track => track.stop());
        
        setStatus("processing");
        // Simulate processing delay
        setTimeout(() => setStatus("complete"), 2000);
        
        toast({
          title: "Recording saved",
          description: "The recording has been anonymized and stored securely.",
        });
      };

      mediaRecorder.current.start();
      setStatus("recording");
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && status === "recording") {
      mediaRecorder.current.stop();
    }
  };

  const toggleRecording = () => {
    if (status === "idle") {
      startRecording();
    } else if (status === "recording") {
      stopRecording();
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