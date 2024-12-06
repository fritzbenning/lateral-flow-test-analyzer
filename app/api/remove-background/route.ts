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
        api_key: process.env.ROBOFLOW_API_KEY,
        inputs: {
          image: { type: "base64", value: base64Image },
        },
      },
    });

    const output = response.data.outputs[0];

    const detectedTestLength = output.testDetection.predictions.length;
    const detectedObjectLength = output.objectDetection.length;

    let base64result = "";

    if (detectedTestLength > 0 && detectedObjectLength > 0) {
      base64result = output.image[0].value;
    } else {
      base64result = base64Image;
    }

    return NextResponse.json({
      data: response.data,
      image: base64result,
      testDetected: detectedTestLength > 0,
      objectDetected: detectedObjectLength > 0,
      detectedObjectLength: detectedObjectLength,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process image", cause: error },
      { status: 500 },
    );
  }
}
