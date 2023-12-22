"use server";
import { aiDataProps } from "@/app/dashboard/GenerateDataCard";
import OpenAI from "openai";
import { getServerSession } from "next-auth";

import {
  getUserCountUsageForToday,
  incrementUserCountUsage,
} from "./userCount";

const openai = new OpenAI({
  organization: process.env.OPENAI_API_ORGANIZATION ?? "",
  apiKey: process.env.OPENAI_API_KEY ?? "",
});

const generateHashtags = async (title: string) => {
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
    console.log({ err });
    return null;
  }
};

const generateImage = async (title: string) => {
  const image = await openai.images.generate({
    model: "dall-e-3",
    prompt: title,
  });

  return image.data[0];
};

export const generateData = async (title: string): Promise<aiDataProps> => {
  const session = await getServerSession();
  const userEmail = session?.user?.email ?? null;

  if (!userEmail) {
    throw new Error("User not logged in");
  }

  const count = await getUserCountUsageForToday(userEmail);
  if (count >= 3) {
    throw new Error("You reach the limit of 3, try again tomorrow");
  }

  const [imageUrl, hashtags] = await Promise.all([
    await generateImage(title),
    await generateHashtags(title),
  ]);

  await incrementUserCountUsage(userEmail);

  return { imageUrl, hashtags };
};
