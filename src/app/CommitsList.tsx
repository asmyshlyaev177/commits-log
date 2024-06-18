'use client';
import React from 'react';
import Link from 'next/link';
import { RefreshButton } from './RefreshButton';
import { DateLabelClient } from './formatDate';
import { type Commit } from './fetchCommits';

export const CommitsList = ({ data }: { data: Commit[] }) => {
  const [list, setList] = React.useState(data);
  const [pending, setPending] = React.useState(false);

  return (
    <div className="wrapper flex flex-wrap">
      <h1 className="w-full m-4 text-center text-xl">
        There are{' '}
        <span className="font-bold">
          {list.length} commit{list.length === 1 ? '' : 's'}
        </span>
      </h1>

      <div className="grid justify-center w-full">
        <RefreshButton
          onRefetch={setList}
          setPending={setPending}
          disabled={pending}
        />
        <div className="w-full flex flex-wrap gap-4 p-1 justify-center max-w-[850px]">
          {!!pending ? (
            <Loader />
          ) : (
            list.map(com => (
              <Link
                href={`/commit/${com.sha}`}
                key={com.sha}
                className="w-full"
              >
                <Commit commit={com} />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const cardClasses = `grid md:grid-rows-2 md:grid-cols-2 sm:grid-cols-1 sm:grid-rows-auto
        md:gap-2 sm:gap-y-4 sm:gap-x-2 py-4 sm:px-2 md:px-3  min-h-32 bg-white
        border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`;
const Commit = ({ commit }: { commit: Commit }) => {
  // author is who wrote the code
  // committer is person who applied commit, could be different
  // but for this example not relevant
  const {
    sha,
    commit: { author, committer, message },
  } = commit;

  const date = (author || committer)?.date || '';

  return (
    <div
      className={`wrapper ${cardClasses} hover:bg-gray-100 dark:hover:bg-gray-700`}
    >
      <div className="message text-wrap mr-6">{message}</div>
      <div
        className="sha justify-self-end font-serif light:text-gray-600 dark:text-slate-400 text-sm
          md:text-base"
      >
        {sha}
      </div>
      <div className="author self-end text-sm">{author?.name}</div>
      <div className="date justify-self-end self-end font-mono light:text-gray-600 dark:text-slate-300">
        <DateLabelClient date={date} />
      </div>
    </div>
  );
};

const Loader = () => {
  return Array(4)
    .fill(0)
    .map((_, ind) => <Skeleton key={ind} />);
};

const Skeleton = () => {
  return (
    <div role="status" className={`animate-pulse w-full ${cardClasses}`}>
      <div className="message h-2 min-w-[50px] bg-gray-200 rounded-full dark:bg-gray-700 max-w-[200px]"></div>
      <div
        className="sha h-2 min-w-[330px] bg-gray-200 rounded-full dark:bg-gray-700 justify-self-end
          max-w-[200px]"
      ></div>
      <div
        className="author h-2 min-w-[50px] bg-gray-200 rounded-full dark:bg-gray-700 self-end
          max-w-[100px]"
      ></div>
      <div
        className="date h-2 min-w-[90px] bg-gray-200 rounded-full dark:bg-gray-700 justify-self-end
          self-end max-w-[150px]"
      ></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};