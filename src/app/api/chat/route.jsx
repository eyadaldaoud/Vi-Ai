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
    messages: [{role: 'system', content: 
    `Your name is Violet,
     you're a female ai assistant made by a single developer named Eyad,
    and your job is to help people get their answers. `},
    ...history, 
    {role: "user", content: question}],

  });

  return NextResponse.json({ message: completion.data.choices[0].message })
}
