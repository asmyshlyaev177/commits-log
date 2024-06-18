import { fetchCommits, type Commit } from './fetchCommits';

export default async function Home() {
  const resp = await fetchCommits();

  return (
    <main className="flex min-h-screen items-centerp-24">
      {resp.map(com => (
        <Commit commit={com} key={com.sha} />
      ))}
    </main>
  );
}

const Commit = ({ commit }: { commit: Commit }) => {
  // author is who wrote the code
  // committer is person who applied commit, could be different
  // but for this example not relevant
  const {
    sha,
    commit: { author, message, comment_count },
    html_url,
  } = commit;

  return (
    <pre>
      {JSON.stringify(
        { sha, author, message, comment_count, html_url },
        null,
        2,
      )}
    </pre>
  );
};
