import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import React from "react";
import { Fade } from "@/components/Fade";

interface TestMockupProps {
  testAreaImage: HTMLImageElement | null;
}

const TestMockup: React.FC<TestMockupProps> = ({ testAreaImage }) => {
  return (
    <div className="long-shadow bg-slate-150 relative flex w-16 items-center justify-center rounded-lg border border-slate-50 px-3 py-2">
      <AnimatePresence mode="wait">
        {testAreaImage && (
          <Fade key={`test-area-${testAreaImage.src}`}>
            <div className="relative mb-6 flex w-full items-center justify-center rounded-lg bg-slate-100 p-1.5">
              <Image
                src={testAreaImage.src}
                alt="Test area"
                width={16}
                height={64}
                className="rounded-sm"
                style={{ width: "auto", height: "auto" }}
              />
              <span className="absolute top-[-1.75rem] text-xs font-bold text-slate-400">
                C
              </span>
              <span className="absolute bottom-[-1.75rem] text-xs font-bold text-slate-400">
                T
              </span>
            </div>
          </Fade>
        )}
      </AnimatePresence>
      <span className="absolute bottom-4 left-4 h-6 w-6 rounded-full bg-slate-100" />
    </div>
  );
};

export default TestMockup;
