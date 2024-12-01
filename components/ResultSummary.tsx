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
    testIntensity,
    comparedIntensity,
    allPixels,
  } = test;

  const testResult = String(result) as "null" | "false" | "true";

  return (
    <div className="flex flex-col gap-5">
      <ResultStatus result={testResult} resultMessage={resultMessage} />
      <div className="flex flex-col gap-2">
        <ResultInfo
          result={testResult}
          controlDeputy={controlPixels[controlIntensity.deputy]?.hsl}
          testDeputy={testPixels[testIntensity.deputy]?.hsl}
        />
        {testResult === "true" && (
          <>
            <IntensityMetric
              comparedValue={comparedIntensity.LAB!}
              controlValue={controlIntensity.LAB!}
              testValue={testIntensity.LAB!}
              variant="LAB"
            />
            <IntensityMetric
              comparedValue={comparedIntensity.HSL!}
              controlValue={controlIntensity.HSL!}
              testValue={testIntensity.HSL!}
              variant="HSL"
            />
          </>
        )}
      </div>
      <ResultDetails
        controlPixels={controlPixels}
        testPixels={testPixels}
        controlIntensity={controlIntensity}
        allPixels={allPixels}
      />
    </div>
  );
};

export default ResultSummary;
