import { base64ToImage, imageToBase64 } from "@/utils/imageConversion";
import axios from "axios";

export async function detectLateralFlowTest(image: HTMLImageElement) {
  try {
    const imageBase64 = await imageToBase64(image);

    const response = await axios({
      method: "POST",
      url: "https://detect.roboflow.com/infer/workflows/friddle/detect-lateral-flow-test",
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

    // Currently only the first test in a image is supported

    const output = response.data.outputs[0];

    const previewImageBase64 = output.previewImage.value;
    const testAreaImageBase64 = output.testAreaImages[0].value;

    const previewImage = await base64ToImage(previewImageBase64);
    const testAreaImage = await base64ToImage(testAreaImageBase64);

    return { testAreaImage, previewImage };
  } catch (error) {
    throw new Error("Failed to detect lateral flow test.", { cause: error });
  }
}
