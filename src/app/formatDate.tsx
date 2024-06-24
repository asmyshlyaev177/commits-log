'use client';
import React from 'react';
import { formatDate } from './utils';

export const useDateInterval = (restartKey: unknown) => {
  const [initialDate, setInitialDate] = React.useState(new Date());
  const [date, setDate] = React.useState(new Date());

  const timer = React.useRef(0 as unknown as NodeJS.Timeout);
  const start = React.useCallback(() => {
    const d = new Date();
    setInitialDate(d);
    setDate(d);
    timer.current = setInterval(() => {
      setDate(new Date());
    }, 29 * 1000);
  }, []);
  const stop = React.useCallback(() => {
    clearInterval(timer.current);
  }, []);

  React.useEffect(() => {
    start();

    return stop;
  }, [restartKey]);

  React.useEffect(() => {
    const diff = (date.getTime() - initialDate.getTime()) / 1000;

    if (diff > 6 * 60) {
      stop();
    }
  }, [date, initialDate]);

  return date;
};

const useIsClient = () => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

export const DateLabelClient = ({ date, now }: { date: string; now: Date }) => {
  const isClient = useIsClient();

  return formatDate(date, isClient ? now : undefined);
};
