import { setResult } from "@/stores/testStore";
import { ChartDataPoint } from "@/types/chart";
import { log } from "@/utils/log";

export const interpreteResult = (
  index: number,
  controlLane: ChartDataPoint | null,
  testLane: ChartDataPoint | null,
  intensity: number | null,
) => {
  log(`✅ The test analysis was successful`, "success");

  // Define result cases
  const cases = [
    {
      condition: !controlLane,
      result: { value: null, message: "The test is invalid or upside down." },
      logEmoji: "⚪️",
    },
    {
      condition: !controlLane && !testLane,
      result: { value: null, message: "The test has not yet been used." },
      logEmoji: "🟡",
    },
    {
      condition: controlLane && !testLane,
      result: { value: false, message: "The test is negative." },
      logEmoji: "🟢",
    },
    {
      condition: controlLane && testLane && intensity,
      result: { value: true, message: "The test is positive." },
      logEmoji: "🔴",
      extraLog: () =>
        log(`🔬 The intensity of the test is ${Math.floor(intensity! * 100)}%`, "info"),
    },
  ];

  // Find the first matching case
  const matchedCase = cases.find((c) => c.condition);

  if (matchedCase) {
    const { result, logEmoji, extraLog } = matchedCase;
    setResult(index, result.value, result.message);
    log(`${logEmoji} ${result.message}`, "info");
    extraLog?.();
  }
};
