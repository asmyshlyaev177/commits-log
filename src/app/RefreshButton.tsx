import React from 'react';
import { useFormStatus } from 'react-dom';
import { refetch } from './actions/refetch';
import { type Commit } from './fetchCommits';
import { Button as BaseButton } from '@/app/components/Button';

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
    <BaseButton type="submit" disabled={disabled} variant="blue">
      Refresh
    </BaseButton>
  );
}
