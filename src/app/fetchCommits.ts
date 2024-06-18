import { Octokit } from 'octokit';

import packageJson from '@/../package.json';

const token = process.env.GITHUB_TOKEN;

const octokit = new Octokit({ auth: token });

export type Commit = Awaited<ReturnType<typeof fetchCommits>>[number];

const owner = packageJson.author.name;
const repo = packageJson.name;
const headers: { 'X-GitHub-Api-Version': string; 'cache-control'?: string } = {
  'X-GitHub-Api-Version': '2022-11-28',
};

export const fetchCommits = async (noCache = false) => {
  const _headers = { ...headers };
  if (noCache) {
    _headers['cache-control'] = 'no-cache';
  }

  const resp = await octokit.request('GET /repos/{owner}/{repo}/commits', {
    owner,
    repo,
    headers: _headers,
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
