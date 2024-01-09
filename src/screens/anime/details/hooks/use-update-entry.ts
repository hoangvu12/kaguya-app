import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { ToastAndroid } from 'react-native';

import type { SaveMediaListEntryMutationVariables } from '@/gql/graphql';
import { getSignedInProviders } from '@/storage/provider';

const useUpdateEntry = (
  mediaId: number,
  options?: Omit<
    UseMutationOptions<
      null,
      unknown,
      Partial<SaveMediaListEntryMutationVariables>,
      unknown
    >,
    'mutationFn'
  >
) => {
  return useMutation(
    async (entry: Partial<SaveMediaListEntryMutationVariables>) => {
      const signedInProviders = getSignedInProviders();

      for (const provider of signedInProviders) {
        await provider.updateEntry(
          { anilistId: mediaId, malId: undefined },
          entry
        );
      }

      return null;
    },
    {
      onSuccess: (data, variables, context) => {
        ToastAndroid.show(
          'Successfully updated the entry.',
          ToastAndroid.SHORT
        );

        options?.onSuccess?.(data, variables, context);
      },
      onError: (errors, variables, context) => {
        ToastAndroid.show('Failed to update the entry.', ToastAndroid.SHORT);

        options?.onError?.(errors, variables, context);
      },
      ...options,
    }
  );
};

export default useUpdateEntry;
