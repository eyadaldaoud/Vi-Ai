import { NextRequest, NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const resault = await request.json();
  const { question } = resault;
  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    prompt: question,
    n: 2,
    size: "1024x1024",
  });
  const images = response.data.data;
  return NextResponse.json({ message: images });
}
