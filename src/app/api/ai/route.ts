import { NextResponse } from "next/server";

const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL;
const URL = `${OPENAI_BASE_URL}/completions`;

export async function POST(req: Request) {
  try {
    const res = await req.json();
    const prompt = res.data;

    const payload = {
      model: OPENAI_MODEL,
      prompt,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 200,
      n: 1,
    };

    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    });

    const json = await response.json();
    return NextResponse.json({ json });
  } catch (error) {
    NextResponse.json({
      json: {
        error: "Something went wrong",
      },
    });
  }
}
