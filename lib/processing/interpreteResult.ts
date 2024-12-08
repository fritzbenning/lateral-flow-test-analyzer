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

  if (!controlLane) {
    setResult(index, null, "The test is invalid or upside down.");
    log("⚪️ The test is invalid or upside down.", "info");

    return;
  }

  if (!controlLane && !testLane) {
    setResult(index, null, "The test has not yet been used.");
    log("🟡 The test has not yet been used.", "info");

    return;
  }

  if (controlLane && !testLane) {
    setResult(index, false, "The test is negative.");
    log("🟢 The test is negative.", "info");

    return;
  }

  if (controlLane && testLane && intensity) {
    setResult(index, true, "The test is positive.");
    log(`🔬 The intensity of the test is ${Math.floor(intensity * 100)}%`, "info");
    log("🔴 Result: The test is positive.", "info");

    return;
  }

  return;
};
