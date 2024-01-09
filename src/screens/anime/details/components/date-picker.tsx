import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import React from 'react';

import type { FuzzyDate } from '@/gql/graphql';
import { Button, Text } from '@/ui';

interface DatePickerProps {
  date: FuzzyDate | undefined;
  onDateChange?: (date: FuzzyDate) => void;
  placeholder: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  date,
  onDateChange,
  placeholder,
}) => {
  const onChange = (_: any, selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    const currentDate = selectedDate;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();

    onDateChange?.({ year, month, day });
  };

  const jsDate = React.useMemo(() => {
    let value = new Date();

    if (date) {
      let year = date.year || value.getFullYear();
      let month = date.month || value.getMonth();
      let day = date.day || value.getDate();

      value = new Date(year, month, day);
    }

    return value;
  }, [date]);

  const showPicker = () => {
    DateTimePickerAndroid.open({
      value: jsDate,
      onChange,
      mode: 'date',
      is24Hour: true,
    });
  };

  return (
    <Button
      onPress={showPicker}
      className="rounded-lg border-2 border-thunder-500 bg-transparent"
    >
      <Text numberOfLines={1}>
        {date ? jsDate.toLocaleDateString() : placeholder}
      </Text>
    </Button>
  );
};

export default DatePicker;
