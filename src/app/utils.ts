export const formatDate = (
  date: Date | string,
  now?: Date,
): [dateStr: string, isRecent: boolean] => {
  const d = new Date(date).valueOf();
  const justDate = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: now ? undefined : 'Europe/Berlin',
  }).format(d);

  if (!now) {
    return [justDate, true];
  }
  const _now = new Date(now).valueOf();

  const diff = (_now - d) / 1000;

  const minutes = Math.floor(diff / 60);

  if (minutes < 1) {
    return ['just now', true];
  }

  if (minutes <= 5) {
    return [
      `${Math.floor(diff / 60)} minute${minutes === 1 ? '' : 's'} ago`,
      true,
    ];
  }

  return [justDate, false];
};
