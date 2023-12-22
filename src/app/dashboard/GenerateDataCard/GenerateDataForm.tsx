"use client";
import { useState } from "react";
import { generateHashtags } from "@/server/actions/ai";

const GenerateDataForm = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    generateHashtags(title);
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
        <button className="btn btn-primary">Generate</button>
      </div>
    </form>
  );
};

export default GenerateDataForm;
