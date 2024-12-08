import { setChartData } from "@/stores/testStore";
import { ChartDataPoint } from "@/types/chart";

export const createChartData = (
  index: number,
  dataPoints: ChartDataPoint[],
  peaks: ChartDataPoint[],
) => {
  const referenceLines = peaks.map((peak) => peak.y);

  const chartData = {
    data: dataPoints,
    referenceLines,
  };

  setChartData(index, chartData);
};
