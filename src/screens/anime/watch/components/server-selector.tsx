import { useAtom, useAtomValue } from 'jotai/react';
import { ServerIcon } from 'lucide-react-native';
import React from 'react';

import type { VideoServer } from '@/types';
import Select from '@/ui/core/select';

import { currentServerAtom, serversAtom } from '../store';
import Tappable from './tappable';

const serverToOption = (server: VideoServer) => ({
  label: server.name,
  value: server,
});

const serversToOptions = (servers: VideoServer[]) => {
  return servers.map((server) => serverToOption(server));
};

const ServerSelector = () => {
  const servers = useAtomValue(serversAtom);
  const [currentServer, setCurrentServer] = useAtom(currentServerAtom);

  if (!servers?.length) return null;

  return (
    <Select
      trigger={({ openBottomSheet }) => (
        <Tappable onPress={openBottomSheet}>
          <ServerIcon size={24} color="white" />
        </Tappable>
      )}
      options={serversToOptions(servers)}
      selectedOption={serverToOption(currentServer || servers[0])}
      onSelect={(option) => setCurrentServer(option.value)}
      snapPoints={['80%']}
    />
  );
};

export default ServerSelector;
