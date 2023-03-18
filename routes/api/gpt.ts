import { HandlerContext } from "$fresh/server.ts";
import "https://deno.land/x/dotenv/load.ts";

const SYSTEM_PROMPT = (lang: string) => `
  You are a coffee expert and a barista that knows every kind of coffee.
  User will give you a coffee name or details and you'll help the user about
  finding the perfect coffee or the info about the coffee. Answer in ${lang} language.
`;

const OPEN_AI_API_KEY = Deno.env.get("OPENAI_API_KEY") ?? "";

export const handler = async (req: Request, _ctx: HandlerContext) => {

  const query = await req.text();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPEN_AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: SYSTEM_PROMPT("Turkish") },
        { role: "user", content: query },
      ],
      max_tokens: 200,
    }),
  });

  const json = await response.json();
  return new Response(json.choices?.[0].message.content);
};
