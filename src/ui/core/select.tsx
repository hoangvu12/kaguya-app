// export const SelectItem = Picker.Item;

import type { BottomSheetProps } from '@gorhom/bottom-sheet';
import { type BottomSheetModal, TouchableOpacity } from '@gorhom/bottom-sheet';
import React, { useEffect, useImperativeHandle, useRef } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { twMerge } from 'tailwind-merge';

import { WIDTH } from '../theme';
import BottomSheet from './bottom-sheet';
import { Button } from './button';
import { ScrollView } from './scroll-view';
import { Text } from './text';
import { View } from './view';

const PADDING = 16;

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

export interface SelectRef {
  openMenu: () => void;
  closeMenu: () => void;
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

const SelectInner = <T,>(
  {
    options,
    selectedOption,
    placeholder,
    onSelect,
    trigger,
    option = (props) => (
      <Button
        className={twMerge(
          props.option.value !== props.selectedOption?.value
            ? 'bg-thunder-700'
            : 'bg-primary-500'
        )}
        key={JSON.stringify(props.option.value)}
        onPress={props.closeBottomSheet}
      >
        <Text>{props.option.label}</Text>
      </Button>
    ),
    endOptionSlot,
    snapPoints = ['25%', '80%'],
  }: SelectProps<T>,
  ref: React.Ref<SelectRef>
) => {
  const [currentOption, setCurrentOption] = React.useState<
    SelectOption<T> | undefined
  >(selectedOption);

  useEffect(() => {
    setCurrentOption(selectedOption);
  }, [selectedOption]);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const closeBottomSheet = () => {
    bottomSheetRef.current?.dismiss();
  };

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  useImperativeHandle(ref, () => ({
    openMenu: () => {
      bottomSheetRef.current?.present();
    },
    closeMenu: () => {
      bottomSheetRef.current?.dismiss();
    },
  }));

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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <View
            className="mb-12 space-y-2"
            style={{ width: WIDTH - PADDING * 2 }}
          >
            <FlatList
              data={options}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    key={item.label}
                    onPress={() => {
                      setCurrentOption(item);
                      onSelect?.(item);
                    }}
                    style={{ width: '100%' }}
                  >
                    {option({
                      closeBottomSheet,
                      openBottomSheet,
                      option: item,
                      selectedOption,
                      placeholder,
                    })}
                  </TouchableOpacity>
                );
              }}
              ItemSeparatorComponent={() => <View className="my-1" />}
              keyExtractor={(item) => item.label}
            />

            {endOptionSlot}
          </View>
        </ScrollView>
      </BottomSheet>
    </React.Fragment>
  );
};

const Select = React.forwardRef(SelectInner) as <T>(
  props: SelectProps<T> & { ref?: React.ForwardedRef<SelectRef> }
) => ReturnType<typeof SelectInner>;

export default Select;
