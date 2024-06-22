"use server";

import { get, ref, type DataSnapshot } from "firebase/database";
import { asyncWrapper } from "@/utils/asyncWrapper";
import { areInTheSameDay } from "@/utils/dates";
import { PrismaClient } from "@prisma/client";
import { database } from "../../../firebaseConfig";

const prisma = new PrismaClient();

const sanitizeUserCount = (
  user: DataSnapshot
): { lastUsage: number; dailyUsage: number } => {
  const lastUsage = user.child("lastUsage").val();
  const dailyUsage = user.child("dailyUsage").val();

  if (typeof lastUsage !== "number") throw new Error();
  if (typeof dailyUsage !== "number") throw new Error();
  console.log({ lastUsage, dailyUsage });
  return { lastUsage, dailyUsage };
};

export const getUserCountUsageForToday = async (email: string) => {
  return asyncWrapper(async () => {
    const userRef = ref(database, `users/${btoa(email)}`);
    const existentUser = await get(userRef);
    if (!existentUser) {
      return 0;
    }

    const { dailyUsage, lastUsage } = sanitizeUserCount(existentUser);

    if (lastUsage && !areInTheSameDay(new Date(lastUsage), new Date())) {
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
