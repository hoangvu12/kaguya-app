import { useAtomValue } from 'jotai/react';
import React, { useEffect } from 'react';
import {
  CastButton as LibCastButton,
  useRemoteMediaClient,
} from 'react-native-google-cast';

import { currentSourceAtom } from '../store';

const CastButton = () => {
  const client = useRemoteMediaClient();
  const currentSource = useAtomValue(currentSourceAtom);

  useEffect(() => {
    if (!client) return;
    if (!currentSource?.file) return;

    client.loadMedia({
      mediaInfo: {
        contentUrl: currentSource.file.url,
      },
    });
  }, [client, currentSource?.file]);

  return (
    <LibCastButton style={{ width: 24, height: 24, tintColor: 'white' }} />
  );
};

export default CastButton;
