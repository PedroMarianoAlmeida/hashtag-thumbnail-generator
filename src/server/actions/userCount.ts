"use server";

import { get, ref } from "firebase/database";
import { asyncWrapper } from "@/utils/asyncWrapper";
import { areInTheSameDay } from "@/utils/dates";
import { PrismaClient } from "@prisma/client";
import firebase from "firebase/compat/app";
import { database } from "../../../firebaseConfig";
const prisma = new PrismaClient();

export const getUserCountUsageForToday = async (email: string) => {
  return asyncWrapper(async () => {
    const testRef = ref(database, "test");
    const testValue = await get(testRef);

    const userCountUsage = 3;

    if (!userCountUsage) {
      return 0;
    }

    // const { lastUsage, dailyUsage } = userCountUsage;

    // if (lastUsage && !areInTheSameDay(lastUsage, new Date())) {
    //   return 0;
    // }

    // return dailyUsage;
    return testValue;
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
