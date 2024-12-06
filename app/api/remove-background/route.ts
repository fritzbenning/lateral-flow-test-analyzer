import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 },
      );
    }

    // Convert File to base64
    const buffer = await file.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    const response = await axios({
      method: "POST",
      url: "https://detect.roboflow.com/infer/workflows/friddle/background-removal",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        api_key: process.env.NEXT_PUBLIC_ROBOFLOW_API_KEY,
        inputs: {
          image: { type: "base64", value: base64Image },
        },
      },
    });

    const output = response.data.outputs[0];
    const base64result = output.image[0].value;
    const detectedTestLength = output.testDetection.predictions.length;
    const detectedObjectLength = output.objectDetection[0].predictions.length;

    return NextResponse.json({
      image: base64result,
      noTestDetected: detectedTestLength === 0,
      noObjectDetected: detectedTestLength >= 1 && detectedObjectLength === 0,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 },
    );
  }
}
