import { getCommit } from '@/app/fetchCommits';

export default async function Commit({ params }: { params: { hash: string } }) {
  const resp = await getCommit(params.hash);

  return (
    <div>
      <pre>{JSON.stringify(resp, null, 2)}</pre>
    </div>
  );
}
