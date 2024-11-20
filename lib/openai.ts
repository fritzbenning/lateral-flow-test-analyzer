import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE_URL,
});

export const analyzeTestImage = async (imageBase64: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "On the image, there is a rapid test visible. How many red lines can you identify? If one red line is visible, the test is negative. If there are more than two red lines, compare their intensity. The upper line is the control line, and the lower line is the test line. The stronger the test line, the more likely the test is positive. Please create a color-highlighted image section where the red lines can be identified.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`,
              },
            },
          ],
        },
      ],
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw new Error(
      "Failed to analyze image because ChatGBT is not available."
    );
  }
};
