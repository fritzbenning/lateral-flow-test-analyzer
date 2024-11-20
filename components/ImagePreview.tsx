import React from "react";

interface ImagePreviewProps {
  file: File;
  onLoad: (imgElement: HTMLImageElement) => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ file, onLoad }) => (
  <div className="relative">
    <img
      src={URL.createObjectURL(file)}
      alt={file.name}
      className="max-w-full h-auto"
      onLoad={(e) => onLoad(e.target as HTMLImageElement)}
    />
  </div>
);

export default ImagePreview;
