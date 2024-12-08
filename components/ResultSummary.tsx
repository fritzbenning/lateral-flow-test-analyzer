import { useTestStore } from "@/stores/testStore";
import { ResultStatus } from "./ResultStatus";
import { ResultInfo } from "./ResultInfo";
import { ResultDetails } from "./ResultDetails";
import { IntensityMetric } from "./IntensityMetric";

interface ResultSummaryProps {
  index: number;
}

const ResultSummary = ({ index }: ResultSummaryProps) => {
  const test = useTestStore((state) => state.tests[index]);

  const {
    result,
    resultMessage,
    controlPixels,
    testPixels,
    controlIntensity,
    allPixels,
    controlLane,
    testLane,
    intensity,
  } = test;

  const testResult = String(result) as "null" | "false" | "true";

  return (
    <div className="flex h-full flex-col justify-between gap-5">
      <div className="flex flex-col gap-5">
        <ResultStatus result={testResult} resultMessage={resultMessage} />
        <div className="flex flex-col gap-2">
          <ResultInfo result={testResult} controlLane={controlLane} testLane={testLane} />
          {intensity && controlLane && testLane && (
            <>
              <IntensityMetric
                intensity={intensity}
                controlValue={controlLane.greyscale}
                testValue={testLane.greyscale}
                variant="Greyscale"
              />
            </>
          )}
        </div>
      </div>
      <ResultDetails
        index={index}
        controlPixels={controlPixels}
        testPixels={testPixels}
        controlIntensity={controlIntensity}
        allPixels={allPixels}
      />
    </div>
  );
};

export default ResultSummary;
