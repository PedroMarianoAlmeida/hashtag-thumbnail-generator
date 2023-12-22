"use server";
import OpenAI from "openai";

const openai = new OpenAI({
  organization: process.env.OPENAI_API_ORGANIZATION ?? "",
  apiKey: process.env.OPENAI_API_KEY ?? "",
});

export const generateHashtags = async (title: string) => {
  try {
    if (title === "") {
      throw new Error("No title provided");
    }
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You will work as a SEO assistant, providing the best hashtags for my text, The answer should be in a JSON format in a array with the field called hashtags (and only the text, without the # symbol).",
        },
        { role: "user", content: title },
      ],
      model: "gpt-3.5-turbo",
    });

    const { hashtags } =
      JSON.parse(completion.choices[0].message.content ?? "") ?? [];

    if (hashtags.length === 0) {
      throw new Error("No hashtags found");
    }

    return hashtags;
  } catch (err) {
    return null;
  }
};
