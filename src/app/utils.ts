export const formatDate = (date: Date | string, now: Date | string) => {
  const _now = new Date(now).valueOf();
  const d = new Date(date).valueOf();
  const justDate = new Intl.DateTimeFormat().format(d);

  if (!now) {
    return justDate;
  }

  const diff = (_now - d) / 1000;

  const minutes = Math.floor(diff / 60);

  if (minutes < 1) {
    return 'just now';
  }

  if (minutes <= 5) {
    return `${Math.floor(diff / 60)} minute${minutes === 1 ? '' : 's'} ago`;
  }

  return justDate;
};
