import {
  blobToImageElement,
  fileToImageElement,
  imageToBase64,
} from "@/utils/imageConversion";
import axios from "axios";
import { removeBackground as localRemoveBackground } from "@imgly/background-removal";
import { setStatus } from "@/stores/testStore";

export const removeBackground = async (index: number, imageFile: File) => {
  try {
    setStatus(index, "Removing background with AI ✨");

    const imageElement = await fileToImageElement(imageFile);
    const imageBase64 = await imageToBase64(imageElement);

    const response = await axios({
      method: "POST",
      url: "https://detect.roboflow.com/infer/workflows/friddle/background-removal",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        api_key: process.env.NEXT_PUBLIC_ROBOFLOW_API_KEY,
        inputs: {
          image: { type: "base64", value: imageBase64 },
        },
      },
    });

    console.log(response.data);

    // only one image is supported so far
    const output = response.data.outputs[0];

    const base64image = output.image[0].value;

    const detectedTestLength = output.testDetection.predictions.length;
    const detectedObjectLength = output.objectDetection[0].predictions.length;

    if (detectedTestLength >= 1 && detectedObjectLength === 0) {
      console.log(detectedTestLength);
      console.log(detectedObjectLength);
      setStatus(index, "Retrying to remove background locally 🪄");
      return await removeBackgroundLocally(imageFile);
    }

    const image = new Image();
    image.src = `data:image/jpeg;base64,${base64image}`;

    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
    });

    return image;
  } catch (error) {
    // try local fallback
    console.log("fallback");
    console.log(error);
    setStatus(index, "Retrying to remove background locally 🪄");
    return await removeBackgroundLocally(imageFile);
  }
};

async function removeBackgroundLocally(imageFile: File) {
  try {
    const blob = await localRemoveBackground(imageFile);
    return await blobToImageElement(blob);
  } catch (err) {
    throw new Error("Failed to remove background.", { cause: err });
  }
}
