import { CircleCheck, ShieldAlert, SwatchBook } from "lucide-react";
import { PixelData } from "../types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PixelCanvas from "./PixelCanvas";
import { Separator } from "./ui/separator";
import { useTestStore } from "@/stores/testStore";
import { useEffect } from "react";

interface ResultSummaryProps {
  index: number;
  test: {
    differenceLAB: number;
    controlLine: {
      units: PixelData[];
    };
    testLine: {
      units: PixelData[];
    };
    intensities?: {
      controlIndex: number;
      testIndex: number;
      LAB: {
        control: number;
        test: number;
        difference: number;
      };
      HSL: {
        control: number;
        test: number;
        difference: number;
      };
    };
  };
}

const ResultSummary = ({ index, test }: ResultSummaryProps) => {
  const tests = useTestStore((state) => state.tests);
  const allPixels = tests[index].allPixels;

  useEffect(() => {
    console.log(allPixels);
  }, [allPixels]);

  const controlIndex = test?.intensities?.controlIndex;
  const testIndex = test?.intensities?.testIndex;

  const controlHSL = controlIndex
    ? test?.controlLine.units[controlIndex].hsl
    : null;
  const testHSL = testIndex ? test?.testLine.units[testIndex].hsl : null;

  return (
    <div className="flex flex-col gap-5">
      <h3 className="flex gap-2 text-lg">
        <div className="flex items-center gap-1.5 text-red-500">
          <ShieldAlert width="20" height="20" /> {tests[index].result}
        </div>
      </h3>
      <div className="flex flex-col gap-2">
        <Alert>
          <AlertTitle className="flex justify-between">
            <span className="flex items-center gap-2">
              <CircleCheck width="20" height="20" /> Control line (C) and test
              line (T) detected
            </span>
            {test?.intensities && (
              <div className="flex gap-1">
                <div
                  className="h-6 w-6 rounded-full"
                  style={{
                    backgroundColor: `hsl(${controlHSL?.h}, ${controlHSL?.s}%, ${controlHSL?.l}%)`,
                  }}
                />
                <div
                  className="h-6 w-6 rounded-full"
                  style={{
                    backgroundColor: `hsl(${testHSL?.h}, ${testHSL?.s}%, ${testHSL?.l}%)`,
                  }}
                />
              </div>
            )}
          </AlertTitle>
        </Alert>
        {test?.intensities && (
          <>
            <Alert>
              <AlertTitle>
                <div className="flex w-full items-center justify-between">
                  <span>
                    <strong>{test?.intensities?.LAB.difference} %</strong>{" "}
                    intensity relative to control line
                  </span>
                  <span className="flex items-center gap-1.5 text-sm font-bold">
                    <SwatchBook width="16" height="16" /> LAB{" "}
                    <span className="font-normal">
                      (90p
                      <sup>th</sup>)
                    </span>
                  </span>
                </div>
              </AlertTitle>
              <AlertDescription>
                (C) {test?.intensities?.LAB.control} a* axis ・ (T){" "}
                {test?.intensities?.LAB.test} a* axis
              </AlertDescription>
            </Alert>
            <Alert>
              <AlertTitle>
                <div className="flex w-full items-center justify-between">
                  <span>
                    <strong>{test?.intensities?.HSL.difference} %</strong>{" "}
                    intensity relative to control line
                  </span>
                  <span className="flex items-center gap-1.5 text-sm font-bold">
                    <SwatchBook width="16" height="16" /> HSL{" "}
                    <span className="font-normal">
                      (90p
                      <sup>th</sup>)
                    </span>
                  </span>
                </div>
              </AlertTitle>
              <AlertDescription>
                (C) {test?.intensities?.HSL.control}% saturation ・ (T){" "}
                {test?.intensities?.HSL.test}% saturation
              </AlertDescription>
            </Alert>
          </>
        )}
      </div>
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="btn">Show identified pixels</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Identified pixels</DialogTitle>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h4 className="text-md">Control</h4>
                <ul className="flex w-[760px] flex-wrap gap-2">
                  {test?.controlLine.units.map(
                    (unit: PixelData, unitIndex: number) => (
                      <li
                        key={unitIndex}
                        className={`h-6 w-6 rounded-md ${unitIndex === controlIndex ? "outline outline-2 outline-offset-2 outline-black" : ""}`}
                        style={{
                          backgroundColor: `hsl(${unit.hsl.h}, ${unit.hsl.s}%, ${unit.hsl.l}%)`,
                        }}
                      >
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="h-6 w-6" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <strong>x:</strong> {unit.x}, <strong>y:</strong>{" "}
                              {unit.y}
                              <Separator className="my-1.5" />
                              <strong>h:</strong> {unit.hsl.h},{" "}
                              <strong>s:</strong> {unit.hsl.s},{" "}
                              <strong>l:</strong> {unit.hsl.l}
                              <Separator className="my-1.5" />
                              <strong>L:</strong> {Math.floor(unit.lab.l)},{" "}
                              <strong>a:</strong> {Math.floor(unit.lab.a)},{" "}
                              <strong>b:</strong> {Math.floor(unit.lab.b)}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                    ),
                  )}
                </ul>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-md">Test</h4>
                <ul className="flex w-[760px] flex-wrap gap-2">
                  {test?.testLine.units.map(
                    (unit: PixelData, unitIndex: number) => (
                      <li
                        key={unitIndex}
                        className={`h-6 w-6 rounded-md ${unitIndex === controlIndex ? "outline outline-2 outline-offset-2 outline-black" : ""}`}
                        style={{
                          backgroundColor: `hsl(${unit.hsl.h}, ${unit.hsl.s}%, ${unit.hsl.l}%)`,
                        }}
                      >
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="h-6 w-6" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <strong>x:</strong> {unit.x}, <strong>y:</strong>{" "}
                              {unit.y}
                              <Separator className="my-1.5" />
                              <strong>h:</strong> {unit.hsl.h},{" "}
                              <strong>s:</strong> {unit.hsl.s},{" "}
                              <strong>l:</strong> {unit.hsl.l}
                              <Separator className="my-1.5" />
                              <strong>L:</strong> {Math.floor(unit.lab.l)},{" "}
                              <strong>a:</strong> {Math.floor(unit.lab.a)},{" "}
                              <strong>b:</strong> {Math.floor(unit.lab.b)}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="btn">Open pixel view</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Canvas Preview</DialogTitle>
            <PixelCanvas pixelData={allPixels} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ResultSummary;
