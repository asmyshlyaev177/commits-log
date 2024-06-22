import Link from 'next/link';

import { getCommit } from '@/app/fetchCommits';
import { Button } from '@/app/components/Button';
import { type Commit as CommitType } from '@/app/fetchCommits';
import { Code } from '@/app/components/Diff';
import { Card } from '@/app/components/Card';

export default async function Commit({ params }: { params: { hash: string } }) {
  const resp = await getCommit(params.hash);

  const files = resp.files || [];

  return (
    <div className="grid gap-4">
      <Link href="/">
        <Button>Go back</Button>
      </Link>

      <div>SHA: {resp.sha}</div>

      <div className="flex flex-col gap-4 max-w-[1000px]">
        {files.map(file => (
          <File file={file} key={file.filename} />
        ))}
      </div>
    </div>
  );
}

type FileType = Required<CommitType>['files'][number];

const File = ({ file }: { file: FileType }) => {
  return (
    <Card
      className="bg-slate-100 text-black dark:bg-gray-800 dark:text-white grid gap-4 rounded
        full-w p-4 shadow border border-red"
    >
      <div className="flex justify-between">
        <div className="font-mono underline">{file.filename}</div>
        <div className="flex gap-2">
          <div>{file.status}</div>
          <div className="font-bold text-green-400">{file.changes}</div>
        </div>
      </div>

      {!!file.patch && <Code value={file.patch} />}
    </Card>
  );
};
