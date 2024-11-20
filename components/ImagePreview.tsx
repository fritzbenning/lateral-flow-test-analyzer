import React from "react";

interface ImagePreviewProps {
  file: File;
  onLoad: (imgElement: HTMLImageElement) => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ file, onLoad }) => (
  <div className="relative w-[320px] h-[320px] overflow-hidden">
    <img
      src={URL.createObjectURL(file)}
      alt={file.name}
      className="w-full h-full object-cover"
      onLoad={(e) => onLoad(e.target as HTMLImageElement)}
    />
    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center p-2">
      {file.name}
    </div>
  </div>
);

export default ImagePreview;
