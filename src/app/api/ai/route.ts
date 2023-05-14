import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL;

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    if (!OPENAI_MODEL) {
      throw new Error("Cannot connect to server.");
    }

    const res = await req.json();

    const completion = await openai.createChatCompletion({
      model: OPENAI_MODEL,
      messages: JSON.parse(res.data),
      temperature: 0.4,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 200,
      n: 1,
    });

    const response = completion?.data?.choices?.[0]?.message || "";

    return NextResponse.json({ response });
  } catch (error) {
    NextResponse.json({
      json: {
        error: "Something went wrong",
      },
    });
  }
}
