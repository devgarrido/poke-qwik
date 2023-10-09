// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.PUBLIC_OPEN_AI_KEY,
  dangerouslyAllowBrowser: true,
});

export const getChatGptResponse = async (
  pokemonName: string
): Promise<string> => {
  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: `Dame información básica sobre el pokemon ${pokemonName}:\n`,
    temperature: 0.9,
    max_tokens: 64,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return (
    response.choices[0].text ||
    `No se encontró información sobre ${pokemonName}, tus muertos...`
  );
};
