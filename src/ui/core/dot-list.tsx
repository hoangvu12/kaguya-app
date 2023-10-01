import React from 'react';
import { twMerge } from 'tailwind-merge';

import { Text } from './text';

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
      className={twMerge('flex flex-row items-center', className)}
    >
      {React.Children.map(children, (child, index) => {
        if (!child) return null;

        if (index === childrenLength - 1) {
          return child;
        }

        return (
          <React.Fragment>
            {child}
            <Dot key={index} className={twMerge('mx-2', dotClassName)} />
          </React.Fragment>
        );
      })}
    </Text>
  );
};

export const Dot: React.FC<DotProps> = (props) => {
  return (
    <Text
      className={twMerge(
        'text-[8px] text-thunder-400 self-center',
        props.className
      )}
    >
      {' '}
      {'\u2B24'}{' '}
    </Text>
  );
};

export default DotList;
