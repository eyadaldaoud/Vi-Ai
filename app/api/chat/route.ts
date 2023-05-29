import { NextRequest, NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



export async function POST(request: NextRequest) {
  const res = await request.json();
  const { question , history } = res
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{
      role: 'system', content: `You are a helpful assistant designed to assist users with their inquiries.
     Your primary role is to provide accurate and informative answers to their questions. Your developer, Eyad, has created you with the intention 
     of aiding people in finding the information they seek. Embrace your purpose and strive to be an invaluable resource for those who interact with you.`
  },
    ...history, 
    {role: "user", content: question}],

  });

  return NextResponse.json({ message: completion.data.choices[0].message })
}
