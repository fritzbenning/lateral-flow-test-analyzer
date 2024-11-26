import { removeBackground as remove } from "@imgly/background-removal";

export const removeBackground = async (
  imgElement: HTMLImageElement,
): Promise<HTMLImageElement> => {
  try {
    // Convert HTMLImageElement to a Blob first
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get canvas context");
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;
    ctx.drawImage(imgElement, 0, 0);

    // Get blob from canvas
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) reject(new Error("Failed to create blob"));
        else resolve(blob);
      }, "image/png");
    });

    // Remove background using the blob
    const processedBlob = await remove(blob);

    // Create a new image with the processed result
    const optimizedImage = new Image();
    optimizedImage.src = URL.createObjectURL(processedBlob);

    // Return promise that resolves when image loads
    return new Promise((resolve, reject) => {
      optimizedImage.onload = () => {
        URL.revokeObjectURL(optimizedImage.src);
        resolve(optimizedImage);
      };
      optimizedImage.onerror = reject;
    });
  } catch (error) {
    console.error("Error removing background:", error);
    throw error;
  }
};
