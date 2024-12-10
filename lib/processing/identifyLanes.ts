import { setControlLane, setError, setTestLane } from "@/stores/testStore";
import { ChartDataPoint } from "@/types/chart";
import { log } from "@/utils/log";

export const identifyLanes = (index: number, peaks: ChartDataPoint[]) => {
  let controlLane = null;
  let testLane = null;

  if (peaks.length === 1) {
    controlLane = peaks[0];
    setControlLane(index, controlLane);

    log(`📍 (C) lane y position: ${controlLane.y}`, "info");
  }

  if (peaks.length === 2) {
    controlLane = peaks[0];
    testLane = peaks[1];

    setControlLane(index, controlLane);
    setTestLane(index, testLane);

    log(`📍 (C) lane y position: ${controlLane.y}`, "info");
    log(`📍 (T) lane y position: ${testLane.y}`, "info");
  }

  if (peaks.length > 2) {
    log("Test lines could not be determined as too many peaks were found.", "warning");
    setError(index, true, "Test lines could not be determined as too many peaks were found.");
  }

  return {
    controlLane,
    testLane,
  };
};
