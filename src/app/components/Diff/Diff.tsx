export const Code = ({ value }: { value: string }) => {
  const splitted = value.split('\n');

  return (
    <pre className="whitespace-pre-wrap break-words text-justify">
      <code className="text-xs md:text-base">
        {splitted.map((text, ind) => (
          <Line key={ind} text={text} />
        ))}
      </code>
    </pre>
  );
};

const Line = ({ text }: { text: String }) => {
  const isAddition = text.match(/^\+/);
  const isRemoval = text.match(/^\-/);

  return (
    <div
      className={`${isAddition ? 'bg-green-400/20' : ''} ${isRemoval ? 'bg-red-400/20' : ''} `}
    >
      <span
        className={`opacity-40 ${!text.match(/^\@@/) ? 'before:content-["."]' : ''} mr-1`}
      />
      <span
        className={`opacity-50 ${isAddition ? 'before:content-["+"]' : ''}`}
      />
      <span
        className={`opacity-50 ${isRemoval ? 'before:content-["-"]' : ''}`}
      />{' '}
      {text.replace(/^[-+]/, '')}
    </div>
  );
};
