import { NextResponse } from "next/server";

const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL;

const promptsCandidates = [
  `Answer using ONLY a single word "true" or "false": 
  Does this sentence describe a potential bussiness idea?:`,
];

function getNextPrompt(originalPrompt: string) {
  return promptsCandidates[0] + originalPrompt;
}

export async function POST(req: Request) {
  const res = await req.json();
  const originalPrompt = res.data;

  const prompt = getNextPrompt(originalPrompt);

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
  const response = await fetch(`${OPENAI_BASE_URL}/completions`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  const json = await response.json();
  return NextResponse.json({ json });
}
