import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import { Text } from '@/ui';

interface NextEpisodeCountdownProps {
  episode: number;
  time: number;
}

const NextEpisodeCountdown: React.FC<NextEpisodeCountdownProps> = ({
  episode,
  time,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = dayjs().unix();
      const remaining = time - currentTime;

      if (remaining <= 0) {
        clearInterval(interval);
      }

      setTimeRemaining(remaining);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  const date = new Date(timeRemaining * 1000);
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const days = Math.floor(timeRemaining / (24 * 60 * 60));

  return (
    <Text variant="sm">
      EP {episode}: {days}d {hours}h {minutes}m {seconds}s
    </Text>
  );
};

export default React.memo(NextEpisodeCountdown);
