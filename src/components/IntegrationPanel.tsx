import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IntegrationType } from "@/lib/types";
import { cn } from "@/lib/utils";

const integrations: { type: IntegrationType; name: string }[] = [
  { type: "XMO", name: "XMO" },
  { type: "WinPLC", name: "WinPLC" },
  { type: "EG_CLINEA", name: "EG Clinea" },
];

interface IntegrationPanelProps {
  selectedIntegration?: IntegrationType;
  onSelect: (type: IntegrationType) => void;
}

const IntegrationPanel = ({
  selectedIntegration,
  onSelect,
}: IntegrationPanelProps) => {
  return (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold">Integration</h3>
      <div className="flex flex-wrap gap-2">
        {integrations.map(({ type, name }) => (
          <Button
            key={type}
            variant="outline"
            onClick={() => onSelect(type)}
            className={cn(
              "transition-all duration-300",
              selectedIntegration === type &&
                "bg-medical-mint/10 text-medical-mint hover:bg-medical-mint/20"
            )}
          >
            {name}
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default IntegrationPanel;