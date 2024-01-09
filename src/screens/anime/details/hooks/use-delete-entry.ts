import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { ToastAndroid } from 'react-native';

import { getSignedInProviders } from '@/storage/provider';

const useDeleteEntry = (
  mediaId: number,
  options?: Omit<
    UseMutationOptions<null, unknown, number, unknown>,
    'mutationFn'
  >
) => {
  return useMutation(
    async (entryId: number) => {
      const signedInProviders = getSignedInProviders();

      for (const provider of signedInProviders) {
        await provider.deleteEntry(
          { anilistId: mediaId, malId: undefined },
          entryId
        );
      }

      return null;
    },
    {
      onSuccess: (data, variables, context) => {
        ToastAndroid.show(
          'Successfully deleted the entry.',
          ToastAndroid.SHORT
        );

        options?.onSuccess?.(data, variables, context);
      },
      onError: (errors, variables, context) => {
        ToastAndroid.show('Failed to delete the entry.', ToastAndroid.SHORT);

        options?.onError?.(errors, variables, context);
      },
      ...options,
    }
  );
};

export default useDeleteEntry;
