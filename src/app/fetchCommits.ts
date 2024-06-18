import { Octokit } from 'octokit';

import packageJson from '@/../package.json';

const token = process.env.GITHUB_TOKEN;

const octokit = new Octokit({ auth: token });

export type Commit = Awaited<ReturnType<typeof fetchCommits>>[number];

const owner = packageJson.author.name;
const repo = packageJson.name;
const headers = {
  'X-GitHub-Api-Version': '2022-11-28',
};

const ONE_HOUR = 60 * 60;
const revalidateOpts = { next: { revalidate: ONE_HOUR } };

export const fetchCommits = async (noCache = false) => {
  const resp = await octokit.request('GET /repos/{owner}/{repo}/commits', {
    owner,
    repo,
    headers,
    request: {
      fetch: (
        url: Parameters<typeof fetch>[0],
        opts: Parameters<typeof fetch>[1],
      ) => {
        return fetch(url, {
          ...opts,
          ...(noCache ? {} : revalidateOpts),
          cache: noCache ? 'no-cache' : undefined,
        });
      },
    },
  });

  if (resp.status !== 200) {
    return [];
  }

  return resp.data;
};

export const getCommit = async (commit: string) => {
  const resp = await octokit.request(
    'GET /repos/{owner}/{repo}/commits/{ref}',
    {
      owner,
      repo,
      ref: commit,
      headers,
    },
  );

  if (resp.status !== 200) {
    return {};
  }

  return resp.data;
};
