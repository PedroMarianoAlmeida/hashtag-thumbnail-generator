"use server";

import { get, set, ref, type DataSnapshot } from "firebase/database";
import { asyncWrapper } from "@/utils/asyncWrapper";
import { areInTheSameDay } from "@/utils/dates";
import { database } from "../../../firebaseConfig";

const sanitizeUserCount = (
  user: DataSnapshot
): { lastUsage: number; dailyUsage: number } => {
  const lastUsage = user.child("lastUsage").val();
  const dailyUsage = user.child("dailyUsage").val();

  if (typeof lastUsage !== "number") throw new Error();
  if (typeof dailyUsage !== "number") throw new Error();

  return { lastUsage, dailyUsage };
};

export const getUserCountUsageForToday = async (userId: string) => {
  return asyncWrapper(async () => {
    const userRef = ref(database, `users/${userId}`);
    const existentUser = await get(userRef);
    if (!existentUser.exists()) {
      return 0;
    }

    const { dailyUsage, lastUsage } = sanitizeUserCount(existentUser);

    if (lastUsage && !areInTheSameDay(new Date(lastUsage), new Date())) {
      return 0;
    }

    return dailyUsage;
  });
};

export const incrementUserCountUsage = async (userId: string) => {
  return asyncWrapper(async () => {
    const currentUsage = await getUserCountUsageForToday(userId);

    if (!currentUsage.success) return new Error();
    const { result: dailyUsage } = currentUsage;
    set(ref(database, `users/${userId}`), {
      dailyUsage: dailyUsage + 1,
      lastUsage: Number(new Date()),
    });
  });
};
