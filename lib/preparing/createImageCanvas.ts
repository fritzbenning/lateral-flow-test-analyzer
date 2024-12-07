import { useConfigStore } from "@/stores/configStore";
import { calcTestImageDimensions } from "./calcTestImageDimensions";

export const createImageCanvas = (imgElement: HTMLImageElement) => {
  // create canvas
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context.");
  }

  // calculate image dimensions
  const { imageSize } = useConfigStore.getState();
  const { width, height } = calcTestImageDimensions(imgElement, imageSize);

  canvas.width = width;
  canvas.height = height;

  // Resize the original image element to match canvas dimensions
  imgElement.width = width;
  imgElement.height = height;

  // draw image on canvas to get image data
  ctx.drawImage(imgElement, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);

  return { imageData, width, height };
};
