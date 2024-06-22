'use server';
import { revalidatePath } from 'next/cache';

import { fetchCommits } from '../fetchCommits';

export const refetch = () => {
  revalidatePath('/');
  return fetchCommits(true);
};
