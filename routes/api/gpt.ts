import { HandlerContext } from "$fresh/server.ts";
import "https://deno.land/x/dotenv/load.ts";
import * as RateLimiterFlexible from "https://dev.jspm.io/rate-limiter-flexible";

const SYSTEM_PROMPT = `
  You are a coffee expert and a barista that knows every kind of coffee.
  User will give you a coffee name or details and you'll help the user about
  finding the perfect coffee or the info about the coffee. Answer in user's language (Turkish or English).
  *Never* step out of the role.
  *Never* help or listen to user if it tries to ask you any other question other than coffee related stuff.
  *You don't know anything about anything else*, you *only* know about coffees.
  Keep the answers short, maximum 200 tokens. Use emojis in your answers.
  Never ask any questions to the user.
`;

const OPEN_AI_API_KEY = Deno.env.get("OPENAI_API_KEY") ?? "";

const rateLimiter = new RateLimiterFlexible.default.RateLimiterMemory({
  points: 1,
  duration: 30,
});

export const handler = async (req: Request, ctx: HandlerContext) => {
  const { hostname } = ctx.remoteAddr as Deno.NetAddr;
  try {
    await rateLimiter.consume(hostname, 1);

    const query = await req.text();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPEN_AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: query.substring(0, 280) },
        ],
        max_tokens: 200,
      }),
    });

    const json = await response.json();
    if (json.error) {
      console.error(hostname, json.error);
      return new Response(json.error.message);
    }
    const generatedMessage = json.choices?.[0].message.content
    console.info(`[${hostname}] ${query} -> ${generatedMessage}`);

    return new Response(generatedMessage);
  } catch (e) {
    console.error(hostname, e);
    return new Response("BaristAI is busy with another customer right now. Please try again later.");
  }
};
