import { OpenAIStream } from "../OpenAIStream";


export const runtime = 'edge';

export async function POST (req: Request): Promise<Response> {
  const { prompt, history } = (await req.json()) as {
    prompt?: string;
    history?: any;
  };

  const payload = { 
    model: "gpt-3.5-turbo",
    messages: [{ "role": "system", content: `You are a helpful assistant designed to assist users with their inquiries.
    Your primary role is to provide accurate and informative answers to their questions. Your developer, Eyad, has created you with the intention 
    of aiding people in finding the information they seek. Embrace your purpose and strive to be an invaluable resource for those who interact with you.` },
      ...history,
      { "role": "user", "content": prompt }],
    stream: true,
   
  };
  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

