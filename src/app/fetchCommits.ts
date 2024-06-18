import { Octokit } from 'octokit';

import packageJson from '@/../package.json';

const token = process.env.GITHUB_TOKEN;

const octokit = new Octokit({ auth: token });

export type Commit = Awaited<ReturnType<typeof fetchCommits>>[number];

export const fetchCommits = async () => {
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
