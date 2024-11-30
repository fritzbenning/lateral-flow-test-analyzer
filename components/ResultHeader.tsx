import { Button } from "@/components/ui/Button";
import { ListRestart } from "lucide-react";

interface ResultHeaderProps {
  onReset: () => void;
}

export default function ResultHeader({ onReset }: ResultHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold">Your result</h2>
      <Button onClick={onReset}>
        <ListRestart className="mr-2 h-5 w-5" />
        Reset
      </Button>
    </div>
  );
}
