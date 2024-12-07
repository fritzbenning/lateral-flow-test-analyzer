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

interface ResultDetailsProps {
  controlPixels: PixelData[];
  testPixels: PixelData[];
  controlIntensity: { deputy: number };
  allPixels: PixelData[][];
}

export const ResultDetails = ({
  controlPixels,
  testPixels,
  controlIntensity,
  allPixels,
}: ResultDetailsProps) => (
  <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
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
          <PixelList
            title="Test"
            pixels={testPixels}
            deputyIndex={controlIntensity.deputy}
          />
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
          <DialogDescription>
            This is a preview of the pixel data.
          </DialogDescription>
        </DialogHeader>
        <PixelCanvas pixelData={allPixels} />
      </DialogContent>
    </Dialog>
  </div>
);
