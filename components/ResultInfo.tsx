import { CircleCheck } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/Alert";
import { resultConfig } from "@/components/ResultStatus";
import { Pixel } from "@/components/Pixel";
import { ChartDataPoint } from "@/types/chart";

interface ResultInfoProps {
  result: "null" | "false" | "true";
  controlLane?: ChartDataPoint;
  testLane?: ChartDataPoint;
}

export const ResultInfo = ({ result, controlLane, testLane }: ResultInfoProps) => {
  return (
    <div className="flex gap-2">
      <Alert>
        <AlertTitle className="flex justify-between">
          <span className="flex items-center gap-2">
            <CircleCheck width="20" height="20" />
            {resultConfig[result].info}
          </span>

          <div className="flex gap-1">
            {controlLane && <Pixel pixel={controlLane} />}
            {testLane && <Pixel pixel={testLane} />}
          </div>
        </AlertTitle>
      </Alert>
    </div>
  );
};
