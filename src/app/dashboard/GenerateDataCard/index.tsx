"use client";
import { useState } from "react";

import GenerateDataForm from "./GenerateDataForm";
import GeneratedData from "./GeneratedData";

export interface aiDataProps {
  imageUrl: { revised_prompt?: string; url?: string };
  hashtags: string[];
}

const GenerateData = () => {
  const [aiData, setAiData] = useState<aiDataProps>({
    hashtags: [],
    imageUrl: { revised_prompt: "", url: "" },
  });

  return (
    <div className="card bg-base-200 shadow-xl w-full max-w-xl">
      <div className="card-body">
        <h2 className="card-title">New Hashtags and Thumbnail!</h2>
        <GenerateDataForm setAiData={setAiData} />
        <GeneratedData aiData={aiData} />
      </div>
    </div>
  );
};

export default GenerateData;
