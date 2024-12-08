import { PixelData } from "../types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip";
import { Separator } from "@/components/ui/Separator";

interface PixelListProps {
  title: string;
  pixels: PixelData[];
  deputyIndex: number;
}

export const PixelList = ({ title, pixels, deputyIndex }: PixelListProps) => (
  <div className="flex flex-col gap-2">
    <h4 className="font-medium">{title}</h4>
    <ul className="flex w-full flex-wrap gap-2">
      {pixels.map((pixel, index) => (
        <li
          key={index}
          className={`h-6 w-6 rounded-md ${index === deputyIndex ? "outline outline-2 outline-offset-2 outline-black" : ""}`}
          style={{
            backgroundColor: `hsl(${pixel.hsl.h}, ${pixel.hsl.s}%, ${pixel.hsl.l}%)`,
          }}
        >
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="h-6 w-6" />
              </TooltipTrigger>
              <TooltipContent>
                <strong>x:</strong> {pixel.x}, <strong>y:</strong> {pixel.y}
                <Separator className="my-1.5" />
                <strong>h:</strong> {pixel.hsl.h}, <strong>s:</strong> {pixel.hsl.s},{" "}
                <strong>l:</strong> {pixel.hsl.l}
                <Separator className="my-1.5" />
                <strong>L:</strong> {Math.floor(pixel.lab.l)}, <strong>a:</strong>{" "}
                {Math.floor(pixel.lab.a)}, <strong>b:</strong> {Math.floor(pixel.lab.b)}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
      ))}
    </ul>
  </div>
);
