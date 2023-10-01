import dayjs from 'dayjs';
import React from 'react';
import type { ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { Media } from '@/types/anilist';
import { Text, View } from '@/ui';

import InfoItem from '../../../components/info-item';

interface InfoSectionProps extends ViewProps {
  media: Media;
}

const InfoSection: React.FC<InfoSectionProps> = ({
  media,
  className,
  ...props
}) => {
  const startDate = React.useMemo(() => {
    let date = dayjs();

    if (media.startDate.day) {
      date = date.date(media.startDate.day);
    }

    if (media.startDate.month) {
      date = date.month(media.startDate.month - 1);
    }

    if (media.startDate.year) {
      date = date.year(media.startDate.year);
    }

    return date.format('MMM D, YYYY');
  }, [media.startDate]);

  const endDate = React.useMemo(() => {
    let date = dayjs();

    if (media.endDate.day) {
      date = date.date(media.endDate.day);
    }

    if (media.endDate.month) {
      date = date.month(media.endDate.month - 1);
    }

    if (media.endDate.year) {
      date = date.year(media.endDate.year);
    }

    return date.format('MMM D, YYYY');
  }, [media.endDate]);

  return (
    <View className={twMerge('space-y-2', className)} {...props}>
      <InfoItem
        title="Mean score"
        value={
          <Text variant="sm">
            <Text variant="sm" className="text-primary-300">
              {media.meanScore / 10}
            </Text>{' '}
            / <Text variant="sm">10</Text>
          </Text>
        }
      />
      <InfoItem title="Status" value={media.status} />
      <InfoItem title="Total episodes" value={media.episodes} />
      <InfoItem title="Average duration" value={media.duration} />
      <InfoItem title="Format" value={media.format} />
      <InfoItem title="Source" value={media.source} />
      <InfoItem
        title="Studio"
        value={
          <View>
            {media.studios.nodes.map((studio) => (
              <Text
                variant="sm"
                className="text-end text-primary-300"
                key={studio.id}
              >
                {studio.name}
              </Text>
            ))}
          </View>
        }
      />

      {media.season && media.seasonYear && (
        <InfoItem
          title="Season"
          value={`${media.season} ${media.seasonYear}`}
        />
      )}

      {startDate && <InfoItem title="Start date" value={startDate} />}
      {endDate && <InfoItem title="End date" value={endDate} />}
    </View>
  );
};

export default InfoSection;
