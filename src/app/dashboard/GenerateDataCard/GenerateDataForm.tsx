"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { generateHashtags } from "@/server/actions/ai";

const GenerateDataForm = () => {
  const [title, setTitle] = useState("");

  const { mutateAsync, isIdle, isSuccess } = useMutation({
    mutationFn: generateHashtags,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: () => {},
  });

  console.log({ isIdle, isSuccess });

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
        <button className="btn btn-primary" disabled={!isIdle && !isSuccess}>
          Generate
        </button>
      </div>
    </form>
  );
};

export default GenerateDataForm;
