import { NextResponse } from "next/server";

const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL;

const promptsCandidates = `Does the following sentence describe a bussiness idea?: `;

function getNextPrompt(originalPrompt: string) {
  return promptsCandidates + originalPrompt;
}

export async function POST(req: Request) {
  const res = await req.json();
  const originalPrompt = res.data;
  const prompt = getNextPrompt(originalPrompt);

  return NextResponse.json({ json: prompt });

  // const payload = {
  //   model: OPENAI_MODEL,
  //   prompt,
  //   temperature: 0.7,
  //   top_p: 1,
  //   frequency_penalty: 0,
  //   presence_penalty: 0,
  //   max_tokens: 200,
  //   n: 1,
  // };
  // const response = await fetch(`${OPENAI_BASE_URL}/completions`, {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${OPENAI_API_KEY}`,
  //   },
  //   method: "POST",
  //   body: JSON.stringify(payload),
  // });

  // const json = await response.json();
  // return NextResponse.json({ json });
}

export async function GET() {
  return NextResponse.json({ message: "Hello from the API!" });
}
