import { CircleCheck } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/Alert";
import { resultConfig } from "@/components/ResultStatus";
import { Pixel } from "@/components/Pixel";

interface ResultInfoProps {
  result: "null" | "false" | "true";
  controlDeputy?: { h: number; s: number; l: number };
  testDeputy?: { h: number; s: number; l: number };
}

export const ResultInfo = ({
  result,
  controlDeputy,
  testDeputy,
}: ResultInfoProps) => (
  <Alert>
    <AlertTitle className="flex justify-between">
      <span className="flex items-center gap-2">
        <CircleCheck width="20" height="20" />
        {resultConfig[result].info}
      </span>
      <div className="flex gap-1">
        {controlDeputy && <Pixel color={controlDeputy} />}
        {testDeputy && <Pixel color={testDeputy} />}
      </div>
    </AlertTitle>
  </Alert>
);
