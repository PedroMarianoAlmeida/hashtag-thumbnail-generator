"use server";
import { aiDataProps } from "@/app/dashboard/GenerateDataCard";
import OpenAI from "openai";
import { getServerSession } from "next-auth";

import {
  getUserCountUsageForToday,
  incrementUserCountUsage,
} from "./userCount";
import { asyncWrapper } from "@/utils/asyncWrapper";
import { checkIfIsArray } from "@/utils/typeCheck";

const openai = new OpenAI({
  organization: process.env.OPENAI_API_ORGANIZATION ?? "",
  apiKey: process.env.OPENAI_API_KEY ?? "",
});

const generateHashtags = async (title: string) => {
  return asyncWrapper(async () => {
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

    if (!checkIfIsArray<string>(hashtags)) throw new Error("No hashtags found");

    if (hashtags.length === 0) {
      throw new Error("No hashtags found");
    }

    return hashtags;
  });
};

const generateImage = async (title: string) => {
  return asyncWrapper(async () => {
    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: title,
    });

    return image.data[0];
  });
};

export const generateData = async (title: string) => {
  return asyncWrapper(async () => {
    const session = await getServerSession();
    const userEmail = session?.user?.email ?? null;

    if (!userEmail) {
      throw new Error("User not logged in");
    }

    const count = await getUserCountUsageForToday(userEmail);
    if (!count.success) throw new Error("Something went wrong");
    const { result: dailyUsage } = count;

    if (dailyUsage >= 3) {
      throw new Error("You reach the limit of 3, try again tomorrow");
    }

    const [imageUrl, hashtags] = await Promise.all([
      await generateImage(title),
      await generateHashtags(title),
    ]);

    if (!imageUrl.success || !hashtags.success)
      throw new Error("Something went wrong");

    const increment = await incrementUserCountUsage(userEmail);
    if (!increment.success) throw new Error("Something went wrong");

    return { imageUrl: imageUrl.result, hashtags: hashtags.result };
  });
};
