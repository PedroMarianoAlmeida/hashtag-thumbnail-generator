import Image from "next/image";
import { aiDataProps } from ".";

interface GeneratedDataProps {
  aiData: aiDataProps;
}

const GeneratedData = ({
  aiData: { hashtags, imageUrl },
}: GeneratedDataProps) => {
  return (
    <div>
      <div className="flex gap-3">
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
    </div>
  );
};

export default GeneratedData;
