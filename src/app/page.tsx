import React from 'react';
import { fetchCommits } from './fetchCommits';
import { CommitsList } from './CommitsList';

export default async function Home() {
  const resp = await fetchCommits();

  return (
    <main>
      <CommitsList data={resp} />
    </main>
  );
}
