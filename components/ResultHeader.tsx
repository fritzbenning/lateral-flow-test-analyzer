import { Button } from "./ui/button";

interface ResultHeaderProps {
  onReset: () => void;
}

export default function ResultHeader({ onReset }: ResultHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold">Result</h2>
      <Button onClick={onReset}>Upload new image</Button>
    </div>
  );
}
