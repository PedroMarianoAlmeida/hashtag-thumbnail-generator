"use client";
import { useContext, Suspense } from "react";
import { AuthContext } from "@/components/Providers/AuthProvider";
import DashboardAuthenticated from "./DashboardAuthenticated";

const DashboardPage = async () => {
  const { userId } = useContext(AuthContext);

  return (
    <main className="flex flex-col items-center gap-10">
      <h1>Dashboard</h1>
      {userId ? (
        <Suspense fallback={<p>Loading...</p>}>
          <DashboardAuthenticated userId={userId} />
        </Suspense>
      ) : (
        <p>You are not logged in.</p>
      )}
    </main>
  );
};

export default DashboardPage;
