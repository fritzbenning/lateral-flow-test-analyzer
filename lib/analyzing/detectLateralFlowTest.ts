import { base64ToImage, imageToBase64 } from "@/utils/imageConversion";
import { log } from "@/utils/log";
import { resizeImage } from "@/lib/preparing/resizeImage";
import { useConfigStore } from "@/stores/configStore";

export async function detectLateralFlowTest(image: HTMLImageElement) {
  try {
    const imageBase64 = await imageToBase64(image);

    const response = await fetch("/api/detect-test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageBase64,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Currently only the first test in a image is supported
    const output = data.outputs[0];

    const previewImageBase64 = output.previewImage.value;
    const testAreaImageBase64 = output.testAreaImages[0].value;

    const previewImage = await base64ToImage(previewImageBase64);
    const testAreaImage = await base64ToImage(testAreaImageBase64);

    const { imageSize } = useConfigStore.getState();
    const resizedTestAreaImage = await resizeImage(
      testAreaImage,
      imageSize * 0.04,
    );

    console.log(imageSize * 0.04);

    log(`✅ Lateral flow test is detected`, "info");

    return { testAreaImage: resizedTestAreaImage, previewImage };
  } catch (error) {
    throw new Error("Failed to detect lateral flow test.", { cause: error });
  }
}
