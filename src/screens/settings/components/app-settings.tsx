import React from 'react';
import { Linking } from 'react-native';

import { DISCORD_URL, GITHUB_URL, KOFI_URL } from '@/constants';
import { Env } from '@/core/env';
import { Image, Text, TouchableOpacity, View } from '@/ui';
import DiscordIcon from '@/ui/icons/discord';
import GitHubIcon from '@/ui/icons/github';
import KofiIcon from '@/ui/icons/kofi';

const contactList = [
  {
    name: 'Discord',
    icon: DiscordIcon,
    url: DISCORD_URL,
  },
  {
    name: 'GitHub',
    icon: GitHubIcon,
    url: GITHUB_URL,
  },
  {
    name: 'Ko-fi',
    icon: KofiIcon,
    url: KOFI_URL,
  },
];

const AppSettings = () => {
  return (
    <View className="flex flex-row items-center gap-2">
      <Image
        source={require('../../../../assets/icon.png')}
        className="h-16 w-16 rounded-full"
      />

      <View>
        <Text>
          Version: <Text weight="semibold">v{Env.VERSION}</Text>{' '}
        </Text>

        <View className="mt-1 flex flex-row items-center gap-2">
          {contactList.map((contact) => (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(contact.url);
              }}
              key={contact.name}
            >
              <contact.icon width={20} height={20} className="text-white" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default AppSettings;
