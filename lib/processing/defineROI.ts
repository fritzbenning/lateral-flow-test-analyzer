import { useConfigStore } from "@/stores/configStore";
import { PixelData } from "@/types";
import { rgbToGrayscale } from "@/lib/preparing/rgbToGrayscale";
import { setChartData } from "@/stores/testStore";

export const defineROI = (pixelData: PixelData[][], width: number, height: number) => {
  const { pixelBinding } = useConfigStore.getState();

  const centerX = Math.floor((width * 0.5) / pixelBinding);
  const boundaryY = Math.floor(height * 0.04) * pixelBinding;

  const uniqueYPixels = pixelData.flat().filter((pixel: PixelData) => {
    const y = pixel.y;
    const x = pixel.x;
    return x === centerX && y >= boundaryY && y < height / pixelBinding - boundaryY;
  });

  const roiPixels = uniqueYPixels;

  return roiPixels;
};
