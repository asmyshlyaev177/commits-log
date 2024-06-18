import React from 'react';
import { fetchCommits, type Commit } from './fetchCommits';
import { CommitsList } from './CommitsList';

export default async function Home() {
  let resp = await fetchCommits();

  return (
    <main className="min-h-screen md:p-16 sm:p-4">
      <CommitsList data={resp} />
    </main>
  );
}
