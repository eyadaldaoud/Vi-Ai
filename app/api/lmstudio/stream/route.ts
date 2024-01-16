import { Streaming } from "../streaming";


export const runtime = 'edge';

export async function POST (req: Request): Promise<Response> {
  const { prompt, history, SystemMessage } = (await req.json()) as {
    prompt?: string;
    history?: any;
    SystemMessage?: any;
    };

    let system_message = SystemMessage;
    
    system_message?.length < 2 ? system_message = "You're a helpful assistant named VI short for violet." : system_message;
   
  const payload = { 
    messages: [{ "role": "system", content: system_message },
      ...history,
      { "role": "user", "content": prompt }],
      stream: true,
  };
  const stream = await Streaming(payload);
  return new Response(stream);
};

