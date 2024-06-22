import Link from 'next/link';

import { getCommit } from '@/app/fetchCommits';
import { Button } from '@/app/components/Button';

export default async function Commit({ params }: { params: { hash: string } }) {
  const resp = await getCommit(params.hash);

  return (
    <div className="fle">
      <Link href="/">
        <Button>Go back</Button>
      </Link>

      <pre>{JSON.stringify(resp, null, 2)}</pre>
    </div>
  );
}
