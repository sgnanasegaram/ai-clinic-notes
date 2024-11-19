import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ClinicalNote } from "@/lib/types";
import { Save } from "lucide-react";

interface NoteEditorProps {
  note: ClinicalNote;
  onSave: (note: ClinicalNote) => void;
}

const NoteEditor = ({ note, onSave }: NoteEditorProps) => {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Klinisk Note</h3>
        <Button
          onClick={() => onSave(note)}
          className="transition-all duration-300 hover:bg-medical-mint"
        >
          <Save className="mr-2 h-4 w-4" />
          Gem
        </Button>
      </div>
      <Textarea
        value={note.content}
        className="min-h-[200px] resize-none"
        placeholder="Den kliniske note vil blive vist her..."
      />
    </Card>
  );
};

export default NoteEditor;