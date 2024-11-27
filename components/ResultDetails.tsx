import {
  Dialog,
  DialogContent,
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
  <div className="flex gap-2">
    <Dialog>
      <DialogTrigger asChild>
        <Button className="btn">Show identified pixels</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Identified pixels</DialogTitle>
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
        <Button>Open pixel view</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Canvas Preview</DialogTitle>
        <PixelCanvas pixelData={allPixels} />
      </DialogContent>
    </Dialog>
  </div>
);
