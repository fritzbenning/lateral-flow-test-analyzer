import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { imageBase64 } = await request.json();

    const response = await axios({
      method: "POST",
      url: "https://detect.roboflow.com/infer/workflows/friddle/detect-lateral-flow-test",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        api_key: process.env.ROBOFLOW_API_KEY,
        inputs: {
          image: { type: "base64", value: imageBase64 },
        },
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error in detect-test API route:", error);
    return NextResponse.json(
      { error: "Failed to detect lateral flow test" },
      { status: 500 },
    );
  }
}
