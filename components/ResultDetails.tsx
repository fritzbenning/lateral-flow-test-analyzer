import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import PixelCanvas from "@/components/PixelCanvas";
import { PixelList } from "@/components/PixelList";
import { PixelData } from "../types";
import Testchart from "./TestChart";
import { useTestStore } from "@/stores/testStore";

interface ResultDetailsProps {
  index: number;
  controlPixels: PixelData[];
  testPixels: PixelData[];
  controlIntensity: { deputy: number };
  allPixels: PixelData[][];
}

export const ResultDetails = ({
  index,
  controlPixels,
  testPixels,
  controlIntensity,
  allPixels,
}: ResultDetailsProps) => {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="btn">Show visualisation</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Visualisation of the pixel values</DialogTitle>
            <DialogDescription>
              The graphs show the greyscale value and the Lab a* value of the pixels.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-md font-medium">Grayscale values of ROI</h3>
              <Testchart
                index={index}
                dataType="greyscaleValue"
                label="Greyscale value"
                color="hsl(var(--chart-1))"
                xSteps={5}
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-md font-medium">LAB a* values of ROI</h3>
              <Testchart
                index={index}
                dataType="labA"
                label="Lab a* value"
                color="hsl(var(--chart-2))"
                xSteps={5}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="btn">Show identified pixels</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Identified pixels</DialogTitle>
            <DialogDescription>
              The following pixels have been identified in the image.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-6">
            <PixelList
              title="Control"
              pixels={controlPixels}
              deputyIndex={controlIntensity.deputy}
            />
            <PixelList title="Test" pixels={testPixels} deputyIndex={controlIntensity.deputy} />
          </div>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="hidden md:block">Open pixel view</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Canvas Preview</DialogTitle>
            <DialogDescription>This is a preview of the pixel data.</DialogDescription>
          </DialogHeader>
          <PixelCanvas pixelData={allPixels} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
