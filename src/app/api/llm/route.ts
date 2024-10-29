import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
export async function POST(req: Request) {
  console.log(req);
  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: "Describe this image in detail: ",
    });

    return Response.json({ result: text });
  } catch (error) {
    return Response.json({ error: error });
  }
}
