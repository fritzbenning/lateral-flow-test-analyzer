import { Button } from "@/components/ui/Button";
import { ListRestart } from "lucide-react";

interface ResultHeaderProps {
  onReset: () => void;
}

export default function ResultHeader({ onReset }: ResultHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold">Your result</h2>
      <Button onClick={onReset} className="flex items-center gap-2">
        <ListRestart width={16} height={16} />
        Reset
      </Button>
    </div>
  );
}
