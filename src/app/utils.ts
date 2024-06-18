export const formatDate = (date: Date | string, now: Date | string) => {
  const _now = new Date(now).valueOf();
  const d = new Date(date).valueOf();

  const diff = (_now - d) / 1000;

  if (diff < 60) {
    return 'just now';
  }

  if (diff <= 60 * 5) {
    return `${Math.floor(diff / 60)} minutes ago`;
  }

  return new Intl.DateTimeFormat('en-GB').format(d);
};
