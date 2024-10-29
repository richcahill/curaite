// app/api/generate-folio/route.ts

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Configuration, OpenAIApi } from "openai-edge";

// Initialize OpenAI Edge Configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
});
const openai = new OpenAIApi(configuration);

// Define Zod schema for input validation
const readingTimeSchema = z.object({
  value: z.string(),
  time: z.string(),
});

const folioInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  audience: z.string().min(1, "Audience is required"),
  process: z.string().min(1, "Process is required"),
  readingTime: readingTimeSchema,
  assets: z
    .array(
      z.object({
        id: z.string().optional(),
        asset: z.string(),
        type: z.string(),
        storageUrl: z.string(),
        createdAt: z.string(),
        tags: z.array(z.string()).optional(),
        content: z.string().optional(),
        detectedText: z.string().optional(),
        llmDescription: z.string().optional(),
      })
    )
    .optional(),
  additionalContext: z.string().optional(),
});

// Function definition for OpenAI's function calling
const functions = [
  {
    name: "generate_folio",
    description: "Generates a folio based on provided assets and context.",
    parameters: {
      type: "object",
      properties: {
        folio: {
          type: "object",
          properties: {
            uuid: { type: "string" },
            ownerUserId: { type: "string" },
            collaborators: {
              type: "array",
              items: { type: "string" },
              nullable: true,
            },
            assets: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string", nullable: true },
                  asset: { type: "string" },
                  type: { type: "string" },
                  storageUrl: { type: "string" },
                  createdAt: { type: "string", format: "date-time" },
                  tags: {
                    type: "array",
                    items: { type: "string" },
                    nullable: true,
                  },
                  content: { type: "string", nullable: true },
                  detectedText: { type: "string", nullable: true },
                  llmDescription: { type: "string", nullable: true },
                },
                required: ["asset", "type", "storageUrl", "createdAt"],
              },
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            title: { type: "string" },
            description: { type: "string" },
            readingTime: { type: "number", nullable: true },
            tags: {
              type: "array",
              items: { type: "string" },
              nullable: true,
            },
            thumbnailUrl: { type: "string", nullable: true },
            published: { type: "boolean" },
          },
          required: [
            "uuid",
            "ownerUserId",
            "assets",
            "title",
            "description",
            "published",
          ],
        },
      },
      required: ["folio"],
    },
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input data
    const inputData = folioInputSchema.parse(body);

    // Prepare the prompt
    const prompt = `Generate a folio with the following details:

Title: ${inputData.title}
Audience: ${inputData.audience}
Process: ${inputData.process}
Reading Time: ${inputData.readingTime.value}
${
  inputData.additionalContext
    ? `Additional Context: ${inputData.additionalContext}`
    : ""
}
${inputData.assets ? `Assets: ${JSON.stringify(inputData.assets)}` : ""}

The folio should match the following TypeScript type:

type Folio = {
  uuid: string;
  ownerUserId: string;
  collaborators?: string[];
  assets: Asset[];
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  readingTime?: number;
  tags?: string[];
  thumbnailUrl?: string;
  published: boolean;
};

type Asset = {
  id?: string;
  asset: string;
  type: string;
  storageUrl: string;
  createdAt: string;
  tags?: string[];
  content?: string;
  detectedText?: string;
  llmDescription?: string;
};
`;

    // Call OpenAI API with function calling
    // TODO, we should probably use gpt-4o-mini to look at the assets first to classify and describe them. maybe even cluster them.
    const response = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      functions: functions,
      function_call: { name: "generate_folio" },
    });

    // Parse the response data
    const data = await response.json();

    const message = data.choices[0].message;

    // Handle function call response
    if (message.function_call) {
      const functionArgs = JSON.parse(message.function_call.arguments);
      const folioData = functionArgs.folio;

      // TODO validate the folio data with a zod schema

      return NextResponse.json({ folio: folioData });
    } else {
      return NextResponse.json({ result: message.content });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
