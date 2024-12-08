import { setIntensity } from "@/stores/testStore";
import { ChartDataPoint } from "@/types/chart";
import { log } from "@/utils/log";

export const calcTestIntensity = (
  index: number,
  controlLane: ChartDataPoint | null,
  testLane: ChartDataPoint | null,
) => {
  if (!controlLane || !testLane) {
    log("The intensity of the test could not be determined.", "warning");
    return null;
  }

  const intensity = testLane.greyscaleValue / controlLane.greyscaleValue;

  setIntensity(index, intensity);

  return intensity;
};
