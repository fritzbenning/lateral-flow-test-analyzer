"use client";

import { Area, AreaChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/Chart";
import { useTestStore } from "@/stores/testStore";
import { generateTicks } from "@/utils/chart";
import { useEffect } from "react";

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
      <ChartContainer config={chartConfig} className="aspect-auto h-[30vh] max-h-[400px]">
        <AreaChart
          accessibilityLayer
          data={chartData.data}
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
          {chartData.referenceLines.map((x: number) => (
            <ReferenceLine
              key={`reference-line-${x}`}
              x={x}
              stroke={`var(--color-${dataType})`}
              strokeDasharray="3 3"
            />
          ))}
          <Area
            name="Value"
            dataKey={dataType}
            type="monotone"
            fill={`url(#fill${dataType})`}
            fillOpacity={0.2}
            stroke={`var(--color-${dataType})`}
            baseLine={0}
            isAnimationActive={false}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default Testchart;
