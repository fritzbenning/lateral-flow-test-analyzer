import { SwatchBook } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";

interface IntensityMetricProps {
  comparedValue: number;
  controlValue: number;
  testValue: number;
  variant: "LAB" | "HSL";
}

export const IntensityMetric = ({
  comparedValue,
  controlValue,
  testValue,
  variant,
}: IntensityMetricProps) => {
  const unit = variant === "LAB" ? "a* axis" : "% saturation";

  return (
    <Alert>
      <AlertTitle>
        <div className="flex w-full items-center justify-between">
          <span>
            <strong>{comparedValue}%</strong> intensity relative to control
          </span>
          <span className="flex items-center gap-1.5 text-sm font-bold">
            <SwatchBook width="16" height="16" /> {variant}{" "}
            <span className="font-normal">
              (90p<sup>th</sup>)
            </span>
          </span>
        </div>
      </AlertTitle>
      <AlertDescription>
        (C) {controlValue} {unit} ・ (T) {testValue} {unit}
      </AlertDescription>
    </Alert>
  );
};
