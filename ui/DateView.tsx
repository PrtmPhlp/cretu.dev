'use client';

import { getRelativeTimeString } from '@/lib/relativeDate';
import { useMounted } from '@/lib/useMounted';

const DateViewer = ({ date }: { date: string }) => {
  const mounted = useMounted();

  return (
    <span className="font-mono text-sm">
      {mounted && getRelativeTimeString(new Date(date)).toUpperCase()}
    </span>
  );
};

export default DateViewer;
