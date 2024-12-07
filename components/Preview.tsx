import React, { useState } from "react";
import Image from "next/image";
import TestMockup from "@/components/TestMockup";
import { Fade } from "@/components/Fade";
import { AnimatePresence } from "framer-motion";

interface ImagePreviewProps {
  image: HTMLImageElement | null;
  optImage: HTMLImageElement | null;
  testAreaImage: HTMLImageElement | null;
}

const Preview: React.FC<ImagePreviewProps> = ({
  image,
  optImage,
  testAreaImage,
}) => {
  const [showOptimized, setShowOptimized] = useState(false);

  return (
    <div className="flex gap-3">
      <TestMockup testAreaImage={testAreaImage} />
      <div
        className="relative flex aspect-square w-full cursor-help items-center justify-center overflow-hidden rounded-md bg-slate-100"
        onClick={() => setShowOptimized(!showOptimized)}
      >
        {image && optImage && (
          <AnimatePresence mode="wait">
            <Fade key={showOptimized ? "optimized" : "preview"} variant="fade">
              <Image
                src={showOptimized ? optImage.src : image.src}
                alt={showOptimized ? "Optimized image" : "Preview image"}
                width={320}
                height={320}
                objectFit="cover"
                className="h-full w-full object-cover"
              />
            </Fade>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Preview;
