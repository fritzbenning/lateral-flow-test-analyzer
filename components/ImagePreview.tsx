import Image from "next/image";
import React from "react";

interface ImagePreviewProps {
  file: File;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ file }) => (
  <div className="relative w-[320px] h-[320px] rounded-md overflow-hidden">
    <Image
      src={URL.createObjectURL(file)}
      alt={file.name}
      width={320}
      height={320}
      className="w-full h-full object-cover"
    />
    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center p-2">
      {file.name}
    </div>
  </div>
);

export default ImagePreview;
