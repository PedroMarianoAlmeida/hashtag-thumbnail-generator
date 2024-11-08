"use client";
import { Dispatch, SetStateAction, useState, useEffect, useContext } from "react";
import { useMutation } from "@tanstack/react-query";

import { generateData } from "@/server/actions/ai";
import { aiDataProps } from ".";
import { AuthContext } from "@/components/Providers/AuthProvider";


interface GenerateDataFormProps {
  setAiData: Dispatch<SetStateAction<aiDataProps>>;
}

const GenerateDataForm = ({ setAiData }: GenerateDataFormProps) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState<string | null>("");
  const { userId } = useContext(AuthContext);
  

  const { mutateAsync, isIdle, isSuccess } = useMutation({
    mutationFn: generateData,
    onSuccess: (data) => {
      console.log({ data });
      if (!data.success) {
        setMessage("Something went wrong");
        return;
      }
      const { hashtags, imageUrl } = data.result;
      setAiData({ hashtags, imageUrl });
      setMessage(null);
    },
    onError: () => {
      setMessage("Something went wrong");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateAsync({ title, userId });
  };

  useEffect(() => {
    if (!isIdle && !isSuccess) {
      setMessage("Loading...");
    }
  }, [isIdle, isSuccess]);

  return (
    <form className="flex flex-col gap-5 mt-5" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Content title "
        className="input input-bordered"
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="card-actions">
        <button
          className="btn btn-primary"
          disabled={(!isIdle && !isSuccess) || title === "" || isSuccess}
        >
          Generate
        </button>
      </div>
      {message}
    </form>
  );
};

export default GenerateDataForm;
