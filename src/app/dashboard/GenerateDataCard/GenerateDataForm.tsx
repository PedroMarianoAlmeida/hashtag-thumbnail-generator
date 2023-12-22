"use client";

import { generateHashtags } from "@/server/actions/ai";

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  generateHashtags("Title");
};

const GenerateDataForm = () => {
  return (
    <form className="flex flex-col gap-5 mt-5" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Content title "
        className="input input-bordered"
      />

      <div className="card-actions">
        <button className="btn btn-primary">Generate</button>
      </div>
    </form>
  );
};

export default GenerateDataForm;
