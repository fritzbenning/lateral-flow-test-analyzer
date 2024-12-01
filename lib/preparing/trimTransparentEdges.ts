export function trimTransparentEdges(blob: Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const result = new Uint8ClampedArray(data.length);
      result.set(data);

      const blockSize = 4;
      const THRESHOLD = Math.min(
        Math.floor(Math.min(img.width, img.height) / 100),
        8,
      );

      const width4 = canvas.width * 4;

      for (let y = 0; y < canvas.height; y += blockSize) {
        for (let x = 0; x < canvas.width; x += blockSize) {
          const minX = Math.max(0, x - THRESHOLD);
          const maxX = Math.min(canvas.width, x + THRESHOLD);
          const minY = Math.max(0, y - THRESHOLD);
          const maxY = Math.min(canvas.height, y + THRESHOLD);

          let nearTransparent = false;

          for (let ny = minY; ny < maxY && !nearTransparent; ny++) {
            const rowOffset = ny * width4;
            for (let nx = minX; nx < maxX; nx++) {
              const nidx = rowOffset + nx * 4;
              if (data[nidx + 3] <= 127) {
                nearTransparent = true;
                break;
              }
            }
          }

          if (nearTransparent) {
            const maxBlockY = Math.min(y + blockSize, canvas.height);
            const maxBlockX = Math.min(x + blockSize, canvas.width);

            for (let cy = y; cy < maxBlockY; cy++) {
              const rowOffset = cy * width4;
              for (let cx = x; cx < maxBlockX; cx++) {
                result[rowOffset + cx * 4 + 3] = 0;
              }
            }
          }
        }
      }

      const newImageData = new ImageData(result, canvas.width, canvas.height);
      ctx.putImageData(newImageData, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Could not create blob"));
      }, "image/png");
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(blob);
  });
}
