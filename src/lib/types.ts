export type RecordingStatus = "idle" | "recording" | "processing" | "complete";

export type IntegrationType = "XMO" | "WinPLC" | "EG_CLINEA";

export type ClinicalNote = {
  id: string;
  content: string;
  timestamp: Date;
  status: "draft" | "final";
  integration?: IntegrationType;
};

export type TranscriptionSegment = {
  id: string;
  text: string;
  timestamp: number;
  speaker: "doctor" | "patient";
};