"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/Chart";
import { useTestStore } from "@/stores/testStore";
import { generateTicks } from "@/utils/chart";

interface TestChartProps {
  index: number;
  dataType: "greyscaleValue" | "labA";
  label: string;
  color?: string;
  xSteps?: number;
}

const Testchart = ({
  index,
  dataType,
  label,
  color = "hsl(var(--chart-1))",
  xSteps = 5,
}: TestChartProps) => {
  const chartConfig = {
    [dataType]: {
      label: label,
      color: color,
    },
  } satisfies ChartConfig;

  const chartData = useTestStore((state) => state.tests[index].chartData);
  const ticks = generateTicks(0, 100, xSteps);

  return (
    <div>
      <ChartContainer config={chartConfig} className="aspect-auto h-[360px]">
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="y"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.toString().slice(0, 3)}
            ticks={ticks}
          />
          <YAxis
            domain={[(dataMin: number) => dataMin * 0.9, (dataMax: number) => dataMax * 1.1]}
            hide
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <defs>
            <linearGradient id={`fill${dataType}`} x1="0" y1="1" x2="0" y2="0">
              <stop offset="5%" stopColor={`var(--color-${dataType})`} stopOpacity={0.1} />
              <stop offset="95%" stopColor={`var(--color-${dataType})`} stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <Area
            name="Value"
            dataKey={dataType}
            type="natural"
            fill={`url(#fill${dataType})`}
            fillOpacity={0.2}
            stroke={`var(--color-${dataType})`}
            baseLine={0}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default Testchart;
