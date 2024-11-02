"use client";
import GenerateData from "./GenerateDataCard";
import { getUserCountUsageForToday } from "@/server/actions/userCount";
import { useContext } from "react";
import { AuthContext } from "@/components/Providers/AuthProvider";

const DashboardPage = async () => {
  const { userId } = useContext(AuthContext);

  if (!userId) {
    return (
      <main className="flex flex-col items-center gap-10">
        <h1>Dashboard</h1>
        <p>You are not logged in.</p>
      </main>
    );
  }

  // const usageCount = await getUserCountUsageForToday(userEmail);

  // if (!usageCount.success) return <p>Something went wrong</p>;
  // const { result: dailyUsage } = usageCount;

  return (
    <main className="flex flex-col items-center gap-10">
      <h1>Dashboard</h1>
      {/* {dailyUsage > 2 ? (
        <p>You reach the limit of 3, try again tomorrow</p>
      ) : (
        <>
          <p>Usage: {dailyUsage}/3</p>
          <GenerateData />
        </>
      )} */}
    </main>
  );
};

export default DashboardPage;
