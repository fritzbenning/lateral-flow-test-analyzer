import { log } from "@/utils/log";

export const createImageCanvas = (image: HTMLImageElement) => {
  // create canvas
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context.");
  }

  const width = image.width;
  const height = image.height;

  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(image, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);

  log("👓 Image data has been read out", "info");

  return { imageData, width, height };
};
