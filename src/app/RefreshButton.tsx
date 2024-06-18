'use client';
import React from 'react';
import { useFormStatus } from 'react-dom';
import { refetch } from './actions/refetch';
import { type Commit } from './fetchCommits';

export function RefreshButton({
  onRefetch,
  disabled,
  setPending,
}: {
  onRefetch: (data: Commit[]) => void;
  disabled: boolean;
  setPending: (status: boolean) => void;
}) {
  const handleSubmit = () => refetch().then(onRefetch);

  return (
    <form action={handleSubmit} className="justify-self-end">
      <Button disabled={disabled} setPending={setPending} />
    </form>
  );
}

export function Button({
  disabled,
  setPending,
}: {
  disabled: boolean;
  setPending: (status: boolean) => void;
}) {
  const { pending } = useFormStatus();

  React.useEffect(() => {
    setPending(pending);
  }, [pending, setPending]);

  return (
    <button
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
        font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600
        dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800
        disabled:opacity-50"
      type="submit"
      disabled={disabled}
    >
      Refresh
    </button>
  );
}
