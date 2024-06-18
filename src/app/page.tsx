import { Octokit } from 'octokit';

import packageJson from '@/../package.json';

const token = process.env.GITHUB_TOKEN;

const octokit = new Octokit({ auth: token });

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

type Commit = Awaited<ReturnType<typeof fetchCommits>>[number];

// TODO: to separate file
const fetchCommits = async () => {
  const resp = await octokit.request('GET /repos/{owner}/{repo}/commits', {
    owner: packageJson.author.name,
    repo: packageJson.name,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (resp.status !== 200) {
    return [];
  }

  return resp.data;
};
