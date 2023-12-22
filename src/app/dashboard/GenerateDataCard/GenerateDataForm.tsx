"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { generateHashtags } from "@/server/actions/ai";

interface GenerateDataFormProps {
  setHashtags: (hashtags: string[]) => void;
}

const GenerateDataForm = ({ setHashtags }: GenerateDataFormProps) => {
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>("");

  const { mutateAsync, isIdle, isSuccess } = useMutation({
    mutationFn: generateHashtags,
    onSuccess: (data) => {
      if (data === null) {
        setErrorMessage("Something went wrong");
        return;
      }
      setHashtags(data)
      setErrorMessage(null);
    },
    onError: () => {
      setErrorMessage("Something went wrong");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateAsync(title);
  };

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
          disabled={(!isIdle && !isSuccess) || title === ""}
        >
          Generate
        </button>
      </div>
      {errorMessage}
    </form>
  );
};

export default GenerateDataForm;
