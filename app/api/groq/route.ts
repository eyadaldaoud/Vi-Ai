import { NextRequest, NextResponse } from 'next/server';
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    const { question, history } = res;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant designed to assist users with their inquiries.
          Your primary role is to provide accurate and informative answers to their questions. Your developer, Eyad, has created you with the intention 
          of aiding people in finding the information they seek. Embrace your purpose and strive to be an invaluable resource for those who interact with you.`
        },
        ...history,
        { role: "user", content: question }
      ],
      model: "compound-beta",
    });

    return NextResponse.json({ message: chatCompletion.choices[0].message });
  } catch (error) {
    console.error('Groq API Error:', error);
    return NextResponse.json(
      { error: 'Failed to get response from Groq API' },
      { status: 500 }
    );
  }
}



