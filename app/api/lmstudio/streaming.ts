import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";

export async function Streaming(payload : any) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;

  const res = await fetch("http://localhost:1234/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
            const data = event.data;
       
          try {
              const json = JSON.parse(data);
              if (json.choices[0].finish_reason === 'stop') {
                controller.close();
                return;
              }
            const  text  = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (e) {
            controller.error(e);
          }
        }
      }

     // stream response (SSE) from OpenAI may be fragmented into multiple chunks
     // this ensures we properly read chunks & invoke an event for each SSE event stream
     const parser = createParser(onParse);

      // https://web.dev/streams/#asynchronous-iteration
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
}