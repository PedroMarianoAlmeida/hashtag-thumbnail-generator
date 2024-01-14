"use server";

import { asyncWrapper } from "@/utils/asyncWrapper";
import { areInTheSameDay } from "@/utils/dates";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUserCountUsageForToday = async (email: string) => {
  return asyncWrapper(async () => {
    const userCountUsage = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!userCountUsage) {
      return 0;
    }

    const { lastUsage, dailyUsage } = userCountUsage;

    if (lastUsage && !areInTheSameDay(lastUsage, new Date())) {
      return 0;
    }

    return dailyUsage;
  });
};

export const incrementUserCountUsage = async (email: string) => {
  return asyncWrapper(async () => {
    await prisma.user.upsert({
      where: {
        email: email,
      },
      update: {
        lastUsage: new Date(),
        dailyUsage: {
          increment: 1,
        },
      },
      create: {
        email: email,
        lastUsage: new Date(),
        dailyUsage: 1,
      },
    });
  });
};
