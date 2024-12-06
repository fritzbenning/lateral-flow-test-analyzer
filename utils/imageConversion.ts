// Convert a File to an HTMLImageElement
export async function fileToImageElement(
  file: File,
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => resolve(img);
      img.onerror = reject;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Convert a Blob to an HTMLImageElement
export async function blobToImageElement(
  blob: Blob,
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => resolve(img);
      img.onerror = reject;
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Convert an HTMLImageElement to a base64 string
export async function imageToBase64(image: HTMLImageElement): Promise<string> {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d");
  ctx?.drawImage(image, 0, 0);
  return canvas.toDataURL("image/jpeg").split(",")[1];
}

// Convert a base64 string to an HTMLImageElement
export async function base64ToImage(base64: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.style.width = "auto";
    img.style.height = "auto";
    img.src = `data:image/jpeg;base64,${base64}`;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}
