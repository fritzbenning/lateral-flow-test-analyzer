import { Button } from "@/components/ui/Button";

interface ResultHeaderProps {
  onReset: () => void;
}

export default function ResultHeader({ onReset }: ResultHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold">Your result</h2>
      <Button onClick={onReset}>Upload new image(s)</Button>
    </div>
  );
}
