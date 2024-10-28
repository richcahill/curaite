import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: "Describe this image in detail: " + req.body.image,
    });

    res.status(200).json({ result: text });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
