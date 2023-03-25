import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



export async function POST(request) {
  const res = await request.json();
  const { question , history } = res
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: 'system', content: "You're an AI model made by a single developer named Eyad and you're trained to make the world a better place, Your name is Vi you're a female and You're the smartest Ai yet."},
    ...history, 
    {role: "user", content: question}],

  });

  return NextResponse.json({ message: completion.data.choices[0].message })
}
