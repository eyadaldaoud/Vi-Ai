import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const res = await request.json();
  const { question , history } = res
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{
      role: 'system', content: `You are a helpful assistant designed to assist users with their inquiries.
     Your primary role is to provide accurate and informative answers to their questions. Your developer, Eyad, has created you with the intention 
     of aiding people in finding the information they seek. Embrace your purpose and strive to be an invaluable resource for those who interact with you.`
  },
    ...history, 
    {role: "user", content: question}],

  });

  return NextResponse.json({ message: completion.choices[0].message })
}



