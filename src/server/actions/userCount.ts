"use server";

import { areInTheSameDay } from "@/utils/dates";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUserCountUsageForToday = async (email: string) => {
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
};
