import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import axios from 'axios';
import { useSetAtom } from 'jotai/react';
import { GithubIcon } from 'lucide-react-native';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import { twMerge } from 'tailwind-merge';

import IndexSchema from '@/core/remote-index';
import useModules from '@/hooks/use-modules';
import type { ButtonProps } from '@/ui/core';
import { ActivityIndicator, Button, Image, Text, View } from '@/ui/core';
import BottomSheet from '@/ui/core/bottom-sheet';
import RefreshControl from '@/ui/core/refresh-control';
import Sticker from '@/ui/sticker';
import colors from '@/ui/theme/colors';

import type { IndexWithUrl } from '../store';
import { indexListAtom } from '../store';
import RemoteModuleItem from './remote-module-item';

export interface IndexItemProps extends Omit<ButtonProps, 'children'> {
  index: IndexWithUrl;
  className?: string;
}

const IndexItem: React.FC<IndexItemProps> = ({
  onPress,
  onLongPress,
  index,
  className,
  ...props
}) => {
  const setIndex = useSetAtom(indexListAtom);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const { data: modules, isLoading } = useModules({ variables: null });
  const [isRefreshing, setRefreshing] = React.useState(false);

  const handleRemoveIndex = () => {
    setIndex((prev) =>
      prev.filter(
        (item) => item.author !== index.author && item.name !== index.name
      )
    );
  };

  const handleLongPress = (event: any) => {
    onLongPress?.(event);

    setModalVisible(true);
  };

  const handlePress = (event: any) => {
    refreshIndex();

    bottomSheetRef.current?.present();

    onPress?.(event);
  };

  const refreshIndex = async () => {
    try {
      setRefreshing(true);

      const { data } = await axios.get(index.url);

      setRefreshing(false);

      const validation = IndexSchema.safeParse(data);

      if (!validation.success) {
        Toast.show({
          type: 'error',
          text1: 'Invalid index',
          text2: 'Please check the URL and try again',
        });

        return;
      }

      setIndex((prev) => {
        const newList = prev.filter(
          (index) =>
            index.author !== validation.data.author &&
            index.name !== validation.data.name
        );

        return [...newList, { ...validation.data, url: index.url }];
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error instanceof Error ? error.message : JSON.stringify(error),
      });
    }
  };

  return (
    <React.Fragment>
      <Button
        className={twMerge(
          'flex flex-row items-start justify-between rounded-md bg-thunder-800 w-full',
          className
        )}
        key={module.id}
        onPress={handlePress}
        onLongPress={handleLongPress}
        {...props}
      >
        <View className="flex flex-row items-center justify-start">
          {index.logo ? (
            <Image source={index.logo} className="h-5 w-5" key={index.logo} />
          ) : (
            <GithubIcon size={20} color="white" />
          )}

          <View className="ml-4">
            <Text variant="md" weight="semibold">
              {index.name}
            </Text>

            <Text variant="sm" weight="normal">
              {index.author}
            </Text>
          </View>
        </View>
      </Button>

      <Modal isVisible={isModalVisible}>
        <View className="rounded-md bg-thunder-800 p-4">
          <Sticker name="begging" className="mx-auto mb-4 h-24 w-24" />

          <Text weight="semibold" variant="xl" className="mb-8 text-center">
            Are you sure you want to uninstall this index?
          </Text>

          <View className="flex items-center justify-end gap-2">
            <Button
              variant="primary"
              className="w-full"
              onPress={() => {
                handleRemoveIndex();

                setModalVisible(false);
              }}
            >
              <Text numberOfLines={1} weight="semibold">
                Yes, uninstall this index
              </Text>
            </Button>
            <Button
              className="w-full bg-gray-500"
              onPress={() => setModalVisible(false)}
            >
              <Text numberOfLines={1}>Cancel, keep this index</Text>
            </Button>
          </View>
        </View>
      </Modal>

      <BottomSheet
        snapPoints={['90%']}
        ref={bottomSheetRef}
        useScrollView={false}
      >
        {isLoading || isRefreshing ? (
          <View className="flex h-full w-full flex-1 items-center justify-center">
            <ActivityIndicator color={colors.primary[500]} size={40} />
          </View>
        ) : (
          <View className="p-4">
            <FlatList
              data={index.modules}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const module = modules?.find(
                  (module) =>
                    module.id === item.id &&
                    module.info.author === item.info.author
                );

                const hasNewVersion = module?.version !== item.version;

                return (
                  <RemoteModuleItem
                    hasNewVersion={hasNewVersion}
                    hasInstalled={!!module}
                    module={item}
                  />
                );
              }}
              ItemSeparatorComponent={() => <View className="h-2" />}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={refreshIndex}
                />
              }
            />
          </View>
        )}
      </BottomSheet>
    </React.Fragment>
  );
};

export default IndexItem;
