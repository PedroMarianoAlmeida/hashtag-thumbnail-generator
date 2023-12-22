import Image from "next/image";
import { aiDataProps } from ".";

interface GeneratedDataProps {
  aiData: aiDataProps;
}

const GeneratedData = ({
  aiData: { hashtags, imageUrl },
}: GeneratedDataProps) => {
  if (
    hashtags.length === 0 &&
    imageUrl.revised_prompt === "" &&
    imageUrl.url === ""
  )
    return;

  return (
    <div className="flex flex-col gap-3">
      <h2>Here is your content!</h2>
      <div className="flex gap-3 flex-wrap">
        {hashtags.map((hashtag) => (
          <div className="badge badge-neutral" key={hashtag}>
            #{hashtag}
          </div>
        ))}
      </div>

      {imageUrl.url && imageUrl.revised_prompt ? (
        <Image
          src={imageUrl.url}
          width={550}
          height={550}
          alt={imageUrl.revised_prompt}
        />
      ) : null}

      <p>Refresh the page to use it again</p>
    </div>
  );
};

export default GeneratedData;
