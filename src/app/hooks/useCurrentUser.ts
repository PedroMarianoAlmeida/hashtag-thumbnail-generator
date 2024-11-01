"use client";
import { useState, useEffect } from "react";
import { getCurrentUser, AuthUser } from "@aws-amplify/auth";

import { asyncWrapper } from "@/utils/asyncWrapper";

const useCurrentUser = () => {
  const [userId, setUserId] = useState<AuthUser["userId"] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);

    const fetchCurrentUser = await asyncWrapper(() => getCurrentUser());
    if (fetchCurrentUser.success) setUserId(fetchCurrentUser.result.userId);
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { userId, loading };
};

export default useCurrentUser;
