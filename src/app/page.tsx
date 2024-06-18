import Link from 'next/link';

import { fetchCommits, type Commit } from './fetchCommits';

export default async function Home() {
  const resp = await fetchCommits();

  return (
    <main className="min-h-screen md:p-16 sm:p-4">
      <div className="wrapper flex flex-wrap">
        <h1 className="w-full m-4 text-center text-xl">
          There are <span className="font-bold">{resp.length} commits</span>
        </h1>

        <div className="grid w-full justify-center gap-4 p-1">
          {resp.map(com => (
            <div className="" key={com.sha}>
              <Link href={`/commit/${com.sha}`} className="w-fit">
                <Commit commit={com} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

const Commit = ({ commit }: { commit: Commit }) => {
  // author is who wrote the code
  // committer is person who applied commit, could be different
  // but for this example not relevant
  const {
    sha,
    commit: { author, message },
    // html_url,
  } = commit;

  return (
    <div
      className="wrapper grid md:grid-rows-2 md:grid-cols-2 sm:grid-cols-1 sm:grid-rows-auto
        md:gap-2 sm:gap-y-4 sm:gap-x-2 py-4 sm:px-2 md:px-3 max-w-5xl min-h-32 bg-white
        border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800
        dark:border-gray-700 dark:hover:bg-gray-700"
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
        {author?.date}
      </div>
    </div>
  );
};
