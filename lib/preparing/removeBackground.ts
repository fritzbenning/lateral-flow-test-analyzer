import { setError, setStatus } from "@/stores/testStore";
import { imageToBase64 } from "@/utils/imageConversion";
import { log } from "@/utils/log";
import { removeBackground as localRemoveBackground } from "@imgly/background-removal";

export const removeBackground = async (
  index: number,
  image: HTMLImageElement,
) => {
  setStatus(index, "Removing background with AI ✨");

  const imageBase64 = await imageToBase64(image);

  try {
    const formData = new FormData();
    formData.append("image", imageBase64);

    const response = await fetch("/api/remove-background", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error(response);
      throw new Error("Failed to remove background");
    }

    const data = await response.json();

    if (!data.testDetected) {
      setError(index, true, "There is no lateral flow test in the image.");
      throw new Error("No test detected");
    }

    // If the API detected potential issues, use local fallback
    if (!data.objectDetected) {
      setStatus(index, "Retrying to remove background locally 🪄");
      const blob = await localRemoveBackground(imageBase64);
      const arrayBuffer = await blob.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      data.image = base64;
    }

    const image = new Image();
    image.src = `data:image/jpeg;base64,${data.image}`;

    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
    });

    log(`🪄 Background is removed successfully`, "info");

    return image;
  } catch (error) {
    console.error(error);
    // Use local fallback if API fails
    try {
      setStatus(index, "Retrying to remove background locally 🪄");
      const blob = await localRemoveBackground(imageBase64);
      const arrayBuffer = await blob.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");

      const image = new Image();
      image.src = `data:image/jpeg;base64,${base64}`;

      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
      });

      log(`🪄 Background is removed successfully`, "info");

      return image;
    } catch (err) {
      throw new Error("Failed to remove background");
    }
  }
};
