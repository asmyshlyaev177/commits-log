'use server';

import { fetchCommits } from '../fetchCommits';

export const refetch = () => {
  return fetchCommits(true);
};
