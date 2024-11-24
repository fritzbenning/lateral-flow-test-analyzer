export const createCanvas = (width: number, height: number) => {
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  canvas.width = width;
  canvas.height = height;

  return { canvas, ctx };
};
