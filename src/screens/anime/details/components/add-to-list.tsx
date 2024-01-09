import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { PlusIcon } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { ToastAndroid } from 'react-native';

import { graphql } from '@/gql';
import type { FuzzyDate, MediaListStatus } from '@/gql/graphql';
import { useGraphQL } from '@/hooks/use-graphql';
import { getSignedInProviders } from '@/storage/provider';
import { Button, Text, View } from '@/ui';
import BottomSheet from '@/ui/core/bottom-sheet';

import useDeleteEntry from '../hooks/use-delete-entry';
import useUpdateEntry from '../hooks/use-update-entry';
import DatePicker from './date-picker';
import NoteInput from './note-input';
import PrivateToggle from './private-toggle';
import ProgressInput from './progress-input';
import RepeatInput from './repeat-input';
import ScoreInput from './score-input';
import StatusSelector from './status-selector';

const addToListQuery = graphql(`
  query AddToListQuery($mediaId: Int) {
    Media(id: $mediaId) {
      mediaListEntry {
        id
        status
        score(format: POINT_10)
        progress
        repeat
        notes
        startedAt {
          year
          month
          day
        }
        completedAt {
          year
          month
          day
        }
        private
      }
      episodes
    }
  }
`);

interface AddToListProps {
  mediaId: number;
}

const AddToList: React.FC<AddToListProps> = ({ mediaId }) => {
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);

  const { data, isLoading, refetch } = useGraphQL(addToListQuery, { mediaId });

  const { mutate: saveEntry, isLoading: updateLoading } = useUpdateEntry(
    mediaId,
    {
      onSettled: () => {
        refetch();

        bottomSheetRef.current?.dismiss();
      },
    }
  );

  const { mutate: deleteEntry, isLoading: deleteLoading } = useDeleteEntry(
    mediaId,
    {
      onSettled: () => {
        refetch();

        bottomSheetRef.current?.dismiss();
      },
    }
  );

  const [localStatus, setLocalStatus] = React.useState<
    MediaListStatus | undefined
  >();
  const [localProgress, setLocalProgress] = React.useState<number | null>(null);
  const [localScore, setLocalScore] = React.useState<number | null>(null);
  const [localStartedAt, setLocalStartedAt] = React.useState<
    FuzzyDate | undefined
  >(undefined);
  const [localCompletedAt, setLocalCompletedAt] = React.useState<
    FuzzyDate | undefined
  >(undefined);
  const [localRepeat, setLocalRepeat] = React.useState<number | null>(null);
  const [localNote, setLocalNote] = React.useState<string | null>(null);
  const [isPrivate, setIsPrivate] = React.useState<boolean>(false);

  const openBottomSheet = () => {
    const signedInProviders = getSignedInProviders();

    if (signedInProviders.length === 0) {
      ToastAndroid.show(
        'You need to sign in to AniList to use this feature.',
        ToastAndroid.LONG
      );

      return;
    }

    bottomSheetRef.current?.present();
  };

  const entryId = data?.Media?.mediaListEntry?.id;

  useEffect(() => {
    setLocalStatus(data?.Media?.mediaListEntry?.status || undefined);
    setLocalProgress(data?.Media?.mediaListEntry?.progress || null);
    setLocalScore(data?.Media?.mediaListEntry?.score || null);
    setLocalStartedAt(data?.Media?.mediaListEntry?.startedAt || undefined);
    setLocalCompletedAt(data?.Media?.mediaListEntry?.completedAt || undefined);
    setLocalRepeat(data?.Media?.mediaListEntry?.repeat || null);
    setLocalNote(data?.Media?.mediaListEntry?.notes || null);
    setIsPrivate(data?.Media?.mediaListEntry?.private ?? false);
  }, [data?.Media?.mediaListEntry]);

  return (
    <React.Fragment>
      <Button
        loading={isLoading}
        onPress={openBottomSheet}
        className="mt-4 bg-thunder-800 text-white"
      >
        {!isLoading ? (
          <React.Fragment>
            {!localStatus ? <PlusIcon size={24} color="white" /> : null}

            <Text>{localStatus || 'Add to list'}</Text>
          </React.Fragment>
        ) : null}
      </Button>

      <BottomSheet ref={bottomSheetRef} snapPoints={['85%', '100%']}>
        <Text variant="xl" weight="semibold">
          List editor
        </Text>

        <View className="mt-4 w-full">
          <StatusSelector
            status={localStatus}
            onStatusChange={(status) => {
              setLocalStatus(status);
            }}
          />
        </View>

        <View className="mt-4">
          <Text className="text-gray-200">Stats</Text>

          <View className="mt-2 w-full">
            <ProgressInput
              totalProgress={data?.Media?.episodes || null}
              progress={localProgress ?? null}
              onProgressChange={(progress) => {
                setLocalProgress(progress);
              }}
            />
          </View>

          <View className="mt-4 w-full">
            <ScoreInput
              score={localScore ?? null}
              onScoreChange={(score) => {
                setLocalScore(score);
              }}
            />
          </View>
        </View>

        <View className="mt-4 w-full">
          <RepeatInput repeat={localRepeat} onRepeatChange={setLocalRepeat} />
        </View>

        <View className="mt-4">
          <Text className="text-gray-200">Date</Text>

          <View className="mt-2 flex flex-row items-center" style={{ gap: 8 }}>
            <View className="flex-1">
              <DatePicker
                placeholder="Started at"
                date={localStartedAt}
                onDateChange={setLocalStartedAt}
              />
            </View>

            <View className="flex-1">
              <DatePicker
                placeholder="Completed at"
                date={localCompletedAt}
                onDateChange={setLocalCompletedAt}
              />
            </View>
          </View>
        </View>

        <View className="mt-4 w-full">
          <Text className="text-gray-200">Other</Text>

          <View className="mt-2">
            <NoteInput note={localNote} onNoteChange={setLocalNote} />
          </View>

          <View className="mt-4">
            <PrivateToggle
              isPrivate={isPrivate}
              onPrivateChange={setIsPrivate}
            />
          </View>
        </View>

        <View className="mt-8 flex w-full flex-row items-center">
          <Button
            loading={updateLoading || deleteLoading}
            onPress={() => {
              if (!entryId) {
                return ToastAndroid.show(
                  "Can't find entry id.",
                  ToastAndroid.SHORT
                );
              }

              deleteEntry(entryId);
            }}
            className="grow bg-thunder-600 text-white"
          >
            <Text>Delete</Text>
          </Button>

          <Button
            loading={updateLoading || deleteLoading}
            onPress={() => {
              const entry = {
                status: localStatus,
                progress: localProgress,
                score: localScore,
                startedAt: localStartedAt,
                completedAt: localCompletedAt,
                repeat: localRepeat,
                notes: localNote,
                private: isPrivate,
              };

              const nonNullEntry = Object.fromEntries(
                Object.entries(entry).filter(
                  ([_, v]) => v !== null && v !== undefined
                )
              );

              saveEntry(nonNullEntry);
            }}
            className="ml-2 grow bg-primary-600 text-white"
          >
            <Text>Save</Text>
          </Button>
        </View>
      </BottomSheet>
    </React.Fragment>
  );
};

export default AddToList;
