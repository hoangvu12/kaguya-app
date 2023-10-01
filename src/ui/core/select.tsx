// export const SelectItem = Picker.Item;

import type { BottomSheetProps } from '@gorhom/bottom-sheet';
import { type BottomSheetModal, TouchableOpacity } from '@gorhom/bottom-sheet';
import React, { useRef } from 'react';

import BottomSheet from './bottom-sheet';
import { Button } from './button';
import { Text } from './text';
import { View } from './view';

export interface SelectOption<T> {
  label: string;
  value: T;
}

export interface TriggerProps<T> {
  selectedOption?: SelectOption<T>;
  options: SelectOption<T>[];
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
  placeholder?: string;
}

export interface ItemProps<T> {
  selectedOption?: SelectOption<T>;
  option: SelectOption<T>;
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
  placeholder?: string;
  setSelectedOption?: (option: SelectOption<T>) => void;
}

export interface SelectProps<T> {
  options: SelectOption<T>[];
  placeholder?: string;
  selectedOption?: SelectOption<T> | undefined;
  trigger: (props: TriggerProps<T>) => React.ReactNode;
  option?: (props: ItemProps<T>) => React.ReactNode;
  onSelect?: (option: SelectOption<T>) => void;
  endOptionSlot?: React.ReactNode;
  snapPoints?: BottomSheetProps['snapPoints'];
}

const Select = <T,>({
  options,
  selectedOption,
  placeholder,
  onSelect,
  trigger,
  option = (props) => (
    <Button
      className="bg-thunder-700"
      key={JSON.stringify(props.option.value)}
      onPress={props.closeBottomSheet}
    >
      <Text>{props.option.label}</Text>
    </Button>
  ),
  endOptionSlot,
  snapPoints = ['25%', '80%'],
}: SelectProps<T>) => {
  const [currentOption, setCurrentOption] = React.useState<
    SelectOption<T> | undefined
  >(selectedOption);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const closeBottomSheet = () => {
    bottomSheetRef.current?.dismiss();
  };

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <React.Fragment>
      {trigger({
        options,
        placeholder,
        selectedOption: currentOption,
        openBottomSheet,
        closeBottomSheet,
      })}

      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
        <View className="space-y-2">
          {options.map((optionItem) => (
            <TouchableOpacity
              onPress={() => {
                setCurrentOption(optionItem);
                onSelect?.(optionItem);
              }}
            >
              {option({
                closeBottomSheet,
                openBottomSheet,
                option: optionItem,
                selectedOption,
                placeholder,
              })}
            </TouchableOpacity>
          ))}

          {endOptionSlot}
        </View>
      </BottomSheet>
    </React.Fragment>
  );
};

export default Select;
