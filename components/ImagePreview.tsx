import Image from "next/image";
import React, { useState } from "react";

interface ImagePreviewProps {
  image: HTMLImageElement | null;
  optImage: HTMLImageElement | null;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ image, optImage }) => {
  const [showOptimized, setShowOptimized] = useState(false);

  return (
    <div
      className="relative aspect-square w-full cursor-help overflow-hidden rounded-md bg-slate-100"
      onClick={() => setShowOptimized(!showOptimized)}
    >
      {image && optImage && (
        <Image
          src={showOptimized ? optImage.src : image.src}
          alt={showOptimized ? "Optimized image" : "Preview image"}
          width={320}
          height={320}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
};

export default ImagePreview;
