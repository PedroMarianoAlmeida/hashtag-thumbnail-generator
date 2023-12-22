"use client";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

import { generateData } from "@/server/actions/ai";
import { aiDataProps } from ".";

interface GenerateDataFormProps {
  setAiData: Dispatch<SetStateAction<aiDataProps>>;
}

const GenerateDataForm = ({ setAiData }: GenerateDataFormProps) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState<string | null>("");

  const { mutateAsync, isIdle, isSuccess } = useMutation({
    mutationFn: generateData,
    onSuccess: (data) => {
      if (data === null) {
        setMessage("Something went wrong");
        return;
      }

      setAiData(data);
      setMessage(null);
    },
    onError: () => {
      setMessage("Something went wrong");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateAsync(title);
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
