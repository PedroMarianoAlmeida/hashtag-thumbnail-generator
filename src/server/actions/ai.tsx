"use server";
import OpenAI from "openai";

const openai = new OpenAI({
  organization: process.env.OPENAI_API_ORGANIZATION ?? "",
  apiKey: process.env.OPENAI_API_KEY ?? "",
});

export const generateHashtags = async (title: string) => {
  console.log("generateHashtags");
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);
  } catch (err) {
    console.log(err);
  }
};
