import Image from "next/image";
import React from "react";

interface ImagePreviewProps {
  image: HTMLImageElement | null;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ image }) => (
  <div className="relative aspect-square w-full overflow-hidden rounded-md">
    {image && (
      <Image
        src={image.src}
        alt="Preview image"
        width={320}
        height={320}
        className="h-full w-full object-cover"
      />
    )}
  </div>
);

export default ImagePreview;
