import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import axios from 'axios';
import { useSetAtom } from 'jotai/react';
import { PlusIcon } from 'lucide-react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
import { twMerge } from 'tailwind-merge';

import IndexSchema from '@/core/remote-index';
import type { ButtonProps } from '@/ui';
import { Button, Text } from '@/ui';
import BottomSheet from '@/ui/core/bottom-sheet';
import Input from '@/ui/core/input';

import { indexListAtom } from '../store';

interface AddIndexProps extends Omit<ButtonProps, 'children'> {}

const isUrl = (url: string) => {
  const regex =
    // eslint-disable-next-line no-useless-escape
    /[(http(s)?):\\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

  return regex.test(url);
};

const AddIndex: React.FC<AddIndexProps> = ({ className, ...props }) => {
  const setIndex = useSetAtom(indexListAtom);
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const [url, setUrl] = React.useState(
    'https://raw.githubusercontent.com/hoangvu12/kaguya-modules/modules/index.json'
  );
  const [loading, setLoading] = React.useState(false);

  const handlePress = () => {
    bottomSheetRef.current?.present();
  };

  const addIndex = async (url: string) => {
    try {
      if (!isUrl(url)) {
        Toast.show({
          type: 'error',
          text1: 'Invalid URL',
          text2: 'Please enter a valid URL',
        });

        return;
      }

      setLoading(true);

      const { data } = await axios.get(url);

      setLoading(false);

      const validation = IndexSchema.safeParse(data);

      if (!validation.success) {
        Toast.show({
          type: 'error',
          text1: 'Invalid index',
          text2: 'The index you provided is invalid',
        });

        return;
      }

      setUrl('');
      setIndex((prev) => {
        const newList = prev.filter(
          (index) =>
            index.author !== validation.data.author &&
            index.name !== validation.data.name
        );

        return [...newList, { ...validation.data, url }];
      });

      bottomSheetRef.current?.dismiss();

      Toast.show({
        type: 'success',
        text1: 'Index added',
        text2: 'The index has been added to your list',
      });
    } catch (err) {
      setLoading(false);

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: err instanceof Error ? err.message : JSON.stringify(err),
      });
    }
  };

  return (
    <React.Fragment>
      <Button
        className={twMerge('w-full rounded-md bg-thunder-800', className)}
        onPress={handlePress}
        {...props}
      >
        <PlusIcon size={24} color="white" />

        <Text variant="md" weight="semibold">
          Add index
        </Text>
      </Button>

      <BottomSheet ref={bottomSheetRef} snapPoints={['50%']}>
        <Input
          onSubmitEditing={() => {
            addIndex(url);
          }}
          value={url}
          onChangeText={setUrl}
          placeholder="Index URL"
        />

        <Button
          loading={loading}
          onPress={() => {
            addIndex(url);
          }}
          className="mt-4"
        >
          <Text>Add</Text>
        </Button>
      </BottomSheet>
    </React.Fragment>
  );
};

export default AddIndex;
