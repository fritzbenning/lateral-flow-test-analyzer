import { SwatchBook } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";

interface IntensityMetricProps {
  intensity: number;
  controlValue: number;
  testValue: number;
  variant: "Greyscale" | "LAB";
}

export const IntensityMetric = ({
  intensity,
  controlValue,
  testValue,
  variant,
}: IntensityMetricProps) => {
  return (
    <Alert>
      <AlertTitle>
        <div className="flex w-full items-center justify-between">
          <span>
            <strong>The test intensity is {Math.floor(intensity * 100)}%</strong>
          </span>
          <span className="flex items-center gap-1.5 text-sm font-bold">
            <SwatchBook width="16" height="16" /> {variant}
          </span>
        </div>
      </AlertTitle>
      <AlertDescription>
        {variant === "Greyscale" && (
          <>
            (C) Greyscale {controlValue} ・ (T) Greyscale {testValue}
          </>
        )}
        {variant === "LAB" && (
          <>
            (C) {Math.floor(controlValue)} a* axis ・ (T) {Math.floor(testValue)} a* axis
          </>
        )}
      </AlertDescription>
    </Alert>
  );
};
