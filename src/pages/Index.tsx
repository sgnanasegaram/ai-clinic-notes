import { useState } from "react";
import RecordingStatus from "@/components/RecordingStatus";
import TranscriptionPreview from "@/components/TranscriptionPreview";
import NoteEditor from "@/components/NoteEditor";
import IntegrationPanel from "@/components/IntegrationPanel";
import { ClinicalNote, IntegrationType, TranscriptionSegment } from "@/lib/types";

const Index = () => {
  const [selectedIntegration, setSelectedIntegration] = useState<IntegrationType>();
  
  // Mock data for demonstration
  const mockSegments: TranscriptionSegment[] = [
    {
      id: "1",
      text: "Goddag, hvad kan jeg hjælpe med i dag?",
      timestamp: Date.now(),
      speaker: "doctor",
    },
    {
      id: "2",
      text: "Jeg har haft hovedpine i nogle dage nu...",
      timestamp: Date.now() + 1000,
      speaker: "patient",
    },
  ];

  const mockNote: ClinicalNote = {
    id: "1",
    content: "Patient præsenterer med cephalgia...",
    timestamp: new Date(),
    status: "draft",
  };

  const handleSaveNote = (note: ClinicalNote) => {
    console.log("Saving note:", note);
  };

  return (
    <div className="container mx-auto animate-fade-in px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">Klinisk Dokumentation</h1>
        <p className="text-medical-charcoal/60">
          AI-assisteret journalføring
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <RecordingStatus />
          <TranscriptionPreview segments={mockSegments} />
        </div>
        
        <div className="space-y-6">
          <IntegrationPanel
            selectedIntegration={selectedIntegration}
            onSelect={setSelectedIntegration}
          />
          <NoteEditor note={mockNote} onSave={handleSaveNote} />
        </div>
      </div>
    </div>
  );
};

export default Index;