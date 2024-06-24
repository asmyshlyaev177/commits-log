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
  const _now = isClient ? now : undefined;
  const [result, setResult] = React.useState(() => formatDate(date));
  const shouldStop = isClient && !result[1];

  React.useEffect(() => {
    if (shouldStop) {
      stop();
    }
  }, [shouldStop, stop]);

  React.useEffect(() => {
    if (isClient) {
      setResult(formatDate(date, _now));
    }
  }, [isClient, _now, date]);

  return result[0];
};
