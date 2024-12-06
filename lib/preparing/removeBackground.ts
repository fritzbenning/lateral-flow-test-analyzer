import { setError, setStatus } from "@/stores/testStore";
import { removeBackground as localRemoveBackground } from "@imgly/background-removal";

export const removeBackground = async (index: number, imageFile: File) => {
  setStatus(index, "Removing background with AI ✨");

  try {
    console.log("Try");
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch("/api/remove-background", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      throw new Error("Failed to remove background");
    }

    const data = await response.json();

    console.log(data);

    if (!data.testDetected) {
      setError(index, true, "There is no lateral flow test in the image.");
      throw new Error("No test detected");
    }

    // If the API detected potential issues, use local fallback
    if (!data.objectDetected) {
      setStatus(index, "Retrying to remove background locally 🪄");
      const blob = await localRemoveBackground(imageFile);
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

    return image;
  } catch (error) {
    console.log(error);
    // Use local fallback if API fails
    try {
      setStatus(index, "Retrying to remove background locally 🪄");
      const blob = await localRemoveBackground(imageFile);
      const arrayBuffer = await blob.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");

      const image = new Image();
      image.src = `data:image/jpeg;base64,${base64}`;

      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
      });

      return image;
    } catch (err) {
      throw new Error("Failed to remove background");
    }
  }
};
