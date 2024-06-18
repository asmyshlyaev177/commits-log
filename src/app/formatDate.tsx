'use client';
import React from 'react';
import { formatDate } from './utils';

export const useDateInterval = () => {
  const [date, setDate] = React.useState(new Date());

  const timer = React.useRef(0 as unknown as NodeJS.Timeout);

  React.useEffect(() => {
    timer.current = setInterval(() => {
      setDate(new Date());
    }, 28 * 1000);

    return () => clearInterval(timer.current);
  }, []);

  const stop = React.useCallback(() => clearInterval(timer.current), []);
  return { date, stop };
};

const useIsClient = () => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

const FIVE_MINUTES = 5 * 60 * 1000;

export const DateLabelClient = ({ date }: { date: string }) => {
  const { date: now, stop } = useDateInterval();
  const isClient = useIsClient();
  const _now = isClient ? now : undefined;
  const result = formatDate(date, _now);
  const shouldStop =
    !!_now && now.valueOf() - new Date(date).valueOf() > FIVE_MINUTES;

  React.useEffect(() => {
    if (shouldStop) {
      stop();
    }
  }, [shouldStop, stop]);

  return result;
};
