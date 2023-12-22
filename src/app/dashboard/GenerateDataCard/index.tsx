'use client'
import { useState } from "react";

import GenerateDataForm from "./GenerateDataForm";
import HashtagsList from "./HashtagsList";

const GenerateData = () => {
  const [hashtags, setHashtags] = useState<string[]>([]);

  return (
    <div className="card bg-base-200 shadow-xl w-full max-w-xl">
      <div className="card-body">
        <h2 className="card-title">New Hashtags and Thumbnail!</h2>
        <GenerateDataForm setHashtags={setHashtags}/>
        <HashtagsList hashtags={hashtags} />
      </div>
    </div>
  );
};

export default GenerateData;
