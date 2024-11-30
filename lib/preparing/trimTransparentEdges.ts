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

      // Copy original data to result
      result.set(data);

      const blockSize = 4; // Process 4x4 blocks at a time
      const THRESHOLD = Math.floor(img.width / 100); // Distance THRESHOLD to transparency

      // Process in blocks
      for (let y = 0; y < canvas.height; y += blockSize) {
        for (let x = 0; x < canvas.width; x += blockSize) {
          // Check if this block is near any transparent pixels
          let nearTransparent = false;

          blockCheck: for (let dy = -THRESHOLD; dy <= THRESHOLD; dy++) {
            for (let dx = -THRESHOLD; dx <= THRESHOLD; dx++) {
              const nx = x + dx;
              const ny = y + dy;

              if (nx < 0 || nx >= canvas.width || ny < 0 || ny >= canvas.height)
                continue;

              const nidx = (ny * canvas.width + nx) * 4;
              if (data[nidx + 3] <= 127) {
                nearTransparent = true;
                break blockCheck;
              }
            }
          }

          // If near transparent pixels, clear the entire 5x5 block
          if (nearTransparent) {
            for (let by = 0; by < blockSize; by++) {
              for (let bx = 0; bx < blockSize; bx++) {
                const cy = y + by;
                const cx = x + bx;

                if (cx >= canvas.width || cy >= canvas.height) continue;

                const idx = (cy * canvas.width + cx) * 4;
                result[idx + 3] = 0;
              }
            }
          }
        }
      }

      // Create new ImageData and put it back
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
