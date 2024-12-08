import { ChartDataPoint } from "@/types/chart";
import { Separator } from "./ui/Separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip";

export const Pixel = ({ pixel }: { pixel: ChartDataPoint }) => (
  <TooltipProvider delayDuration={100}>
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="h-6 w-6 cursor-help rounded-full transition-transform hover:scale-110"
          style={{
            backgroundColor: `hsl(${pixel.hsl.h}, ${pixel.hsl.s}%, ${pixel.hsl.l}%)`,
          }}
        />
      </TooltipTrigger>
      <TooltipContent>
        <strong>x:</strong> {pixel.x}, <strong>y:</strong> {pixel.y}
        <Separator className="my-2" />
        <strong>h:</strong> {pixel.hsl.h}, <strong>s:</strong> {pixel.hsl.s}, <strong>l:</strong>{" "}
        {pixel.hsl.l}
        <Separator className="my-2" />
        <strong>L:</strong> {Math.floor(pixel.lab.l)}, <strong>a:</strong> {Math.floor(pixel.lab.a)}
        , <strong>b:</strong> {Math.floor(pixel.lab.b)}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
