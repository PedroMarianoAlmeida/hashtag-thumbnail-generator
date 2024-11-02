import { AuthUser } from "@aws-amplify/auth";
import GenerateData from "./GenerateDataCard";
import { getUserCountUsageForToday } from "@/server/actions/userCount";

const DashboardAuthenticated = async ({
  userId,
}: {
  userId: AuthUser["userId"];
}) => {
  const usageCount = await getUserCountUsageForToday(userId);

  if (!usageCount) return <p>...Loading</p>;

  if (!usageCount.success) return <p>Something went wrong</p>;
  const { result: dailyUsage } = usageCount;

  if (dailyUsage > 2)
    return <p>You reach the limit of 3, try again tomorrow</p>;

  return (
    <>
      <p>Usage: {dailyUsage}/3</p>
      <GenerateData />
    </>
  );
};

export default DashboardAuthenticated;
