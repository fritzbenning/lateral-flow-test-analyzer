import {
  CircleCheck,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  SwatchBook,
} from "lucide-react";
import { PixelData } from "../types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import PixelCanvas from "@/components/PixelCanvas";
import { Separator } from "@/components/ui/Separator";
import { useTestStore } from "@/stores/testStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

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

  const controlDeputy =
    tests[index].controlPixels[tests[index].controlIntensity.deputy].hsl;

  const testDeputy =
    tests[index].testPixels[tests[index].controlIntensity.deputy].hsl;

  const resultConfig = {
    null: {
      icon: <ShieldQuestion width="20" height="20" />,
      colorClass: "text-slate-500",
      info: "No control line (C) detected",
    },
    false: {
      icon: <ShieldCheck width="20" height="20" />,
      colorClass: "text-green-500",
      info: "Control line (C) detected",
    },
    true: {
      icon: <ShieldAlert width="20" height="20" />,
      colorClass: "text-red-500",
      info: "Control line (C) and test line (T) detected",
    },
  } as const;

  const result = String(tests[index].result) as keyof typeof resultConfig;

  return (
    <div className="flex flex-col gap-5">
      <h3 className="flex gap-2 text-lg">
        <div>
          <span
            className={`flex items-center gap-1.5 ${resultConfig[result].colorClass}`}
          >
            {resultConfig[result].icon}
            {tests[index].resultMessage}
          </span>
        </div>
      </h3>
      <div className="flex flex-col gap-2">
        <Alert>
          <AlertTitle className="flex justify-between">
            <span className="flex items-center gap-2">
              <CircleCheck width="20" height="20" />
              {resultConfig[result].info}
            </span>

            <div className="flex gap-1">
              {controlDeputy && (
                <div
                  className="h-6 w-6 rounded-full"
                  style={{
                    backgroundColor: `hsl(${controlDeputy?.h}, ${controlDeputy?.s}%, ${controlDeputy?.l}%)`,
                  }}
                />
              )}
              {testDeputy && (
                <div
                  className="h-6 w-6 rounded-full"
                  style={{
                    backgroundColor: `hsl(${testDeputy?.h}, ${testDeputy?.s}%, ${testDeputy?.l}%)`,
                  }}
                />
              )}
            </div>
          </AlertTitle>
        </Alert>
        {test?.intensities && (
          <>
            <Alert>
              <AlertTitle>
                <div className="flex w-full items-center justify-between">
                  <span>
                    <strong>{test?.intensities?.LAB.difference} %</strong>{" "}
                    intensity relative to control
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
                (C) {tests[index].controlIntensity?.LAB} a* axis ・ (T){" "}
                {tests[index].testIntensity?.LAB} a* axis
              </AlertDescription>
            </Alert>
            <Alert>
              <AlertTitle>
                <div className="flex w-full items-center justify-between">
                  <span>
                    <strong>{test?.intensities?.HSL.difference} %</strong>{" "}
                    intensity relative to control
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
                (C) {tests[index].controlIntensity?.HSL}% saturation ・ (T){" "}
                {tests[index].testIntensity?.HSL}% saturation
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
                  {tests[index].controlPixels.map(
                    (unit: PixelData, unitIndex: number) => (
                      <li
                        key={unitIndex}
                        className={`h-6 w-6 rounded-md ${unitIndex === tests[index].controlIntensity.deputy ? "outline outline-2 outline-offset-2 outline-black" : ""}`}
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
                  {tests[index].testPixels.map(
                    (unit: PixelData, unitIndex: number) => (
                      <li
                        key={unitIndex}
                        className={`h-6 w-6 rounded-md ${unitIndex === tests[index].controlIntensity.deputy ? "outline outline-2 outline-offset-2 outline-black" : ""}`}
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
            <Button>Open pixel view</Button>
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
