import Image from "next/image";
import React from "react";

interface ImagePreviewProps {
  file: File;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ file }) => (
  <div className="relative aspect-square w-full overflow-hidden rounded-md">
    <Image
      src={URL.createObjectURL(file)}
      alt={file.name}
      width={320}
      height={320}
      className="h-full w-full object-cover"
    />
  </div>
);

export default ImagePreview;
