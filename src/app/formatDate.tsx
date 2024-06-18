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

export const DateLabelClient = ({ date }: { date: string }) => {
  const { date: now, stop } = useDateInterval();
  const isClient = useIsClient();

  const result = formatDate(date, isClient ? now : '');
  // stop timer after there is no updates
  React.useEffect(() => {
    if (!result.match(' (ago|now)$')) {
      stop();
    }
  }, [result, stop]);

  return result;
};
