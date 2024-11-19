import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ClinicalNote } from "@/lib/types";
import { Save } from "lucide-react";
import { storeClinicalNote } from "@/lib/storage";
import { useToast } from "@/components/ui/use-toast";

interface NoteEditorProps {
  note: ClinicalNote;
  onSave: (note: ClinicalNote) => void;
}

const NoteEditor = ({ note, onSave }: NoteEditorProps) => {
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      const noteId = await storeClinicalNote(note.content);
      onSave({ ...note, id: noteId });
      
      toast({
        title: "Note saved",
        description: "The clinical note has been anonymized and stored securely.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the clinical note.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Klinisk Note</h3>
        <Button
          onClick={handleSave}
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