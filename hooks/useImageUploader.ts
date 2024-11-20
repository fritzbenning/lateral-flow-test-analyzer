import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { analyzeImage } from "../utils/imageProcessing";
import { rgbToLab } from "../utils/helpers";

export function useImageUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [pixelData, setPixelData] = useState<PixelData[][]>([]);
  const [highHueRedUnits, setHighHueRedUnits] = useState<
    { x: number; y: number }[]
  >([]);
  const [groupedUnits, setGroupedUnits] = useState<
    { x: number; y: number }[][]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [redIntensities, setRedIntensities] = useState<number[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
  });

  const handleImageLoad = (imgElement: HTMLImageElement) => {
    setLoading(true);
    const { pixelData, highHueRedUnits, groupedUnits } =
      analyzeImage(imgElement);
    setPixelData(pixelData);
    setHighHueRedUnits(highHueRedUnits);
    setGroupedUnits(groupedUnits);

    const intensities = groupedUnits.map((group) => {
      const totalRedIntensity = group.reduce((sum, { x, y }) => {
        const pixel = pixelData[y][x];
        console.log(`Pixel: r=${pixel.red}, g=${pixel.green}, b=${pixel.blue}`); // Debugging line
        const { a } = rgbToLab(pixel.red, pixel.green, pixel.blue);
        return sum + a;
      }, 0);
      return totalRedIntensity / group.length;
    });
    setRedIntensities(intensities);
    setLoading(false);
  };

  return {
    files,
    getRootProps,
    getInputProps,
    isDragActive,
    pixelData,
    highHueRedUnits,
    groupedUnits,
    loading,
    redIntensities,
    onDrop: handleImageLoad,
  };
}
