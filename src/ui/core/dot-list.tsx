import React from 'react';
import { twMerge } from 'tailwind-merge';

import { Text } from './text';
import { View } from './view';

interface DotListProps {
  className?: string;
  dotClassName?: string;
}

interface DotProps {
  className?: string;
}

const DotList: React.FC<React.PropsWithChildren<DotListProps>> = ({
  children,
  className,
  dotClassName,
}) => {
  const childrenLength = React.Children.count(children);

  return (
    <Text
      numberOfLines={1}
      className={twMerge('flex flex-row items-center gap-2', className)}
    >
      {React.Children.map(children, (child, index) => {
        if (!child) return null;

        if (index === childrenLength - 1) {
          return child;
        }

        return (
          <React.Fragment>
            {child}
            <Dot key={index} className={twMerge(dotClassName)} />
          </React.Fragment>
        );
      })}
    </Text>
  );
};

export const Dot: React.FC<DotProps> = (props) => {
  return (
    <View className={twMerge('bg-thunder-400 w-1.5 h-1.5', props.className)} />
  );
};

export default DotList;
