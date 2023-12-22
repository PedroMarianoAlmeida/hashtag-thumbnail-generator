interface HashtagsListProps {
  hashtags: string[];
}

const HashtagsList = ({ hashtags }: HashtagsListProps) => {
  return (
    <div className="flex gap-3">
      {hashtags.map((hashtag) => (
        <div className="badge badge-neutral" key={hashtag}>
          #{hashtag}
        </div>
      ))}
    </div>
  );
};

export default HashtagsList;
