import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { ArrowLeft, CakeIcon, HeartIcon } from 'lucide-react-native';
import { styled } from 'nativewind';
import React from 'react';

import { formatNumberToAbbreviated } from '@/core';
import type { FragmentType } from '@/gql';
import { graphql, useFragment } from '@/gql';
import { Button, Text, View } from '@/ui';
import { PlainCard } from '@/ui/plain-card';

const SCakeIcon = styled(CakeIcon);
const SHeartIcon = styled(HeartIcon);

export const InfoSectionFragment = graphql(`
  fragment CharacterInfo on Character {
    id
    name {
      userPreferred
    }
    image {
      large
    }
    gender
    dateOfBirth {
      year
      month
      day
    }
    age
    bloodType
    favourites
  }
`);

interface InfoSectionProps {
  character: FragmentType<typeof InfoSectionFragment>;
}

const isFalsy = (value: any) => {
  return value === undefined || value === null || value === '';
};

const InfoSection: React.FC<InfoSectionProps> = ({
  character: characterProp,
}) => {
  const navigation = useNavigation();

  const character = useFragment(InfoSectionFragment, characterProp);

  const isBirthday = (() => {
    const birthday = character.dateOfBirth;

    if (!birthday) return false;

    const date = dayjs();

    return date.date() === birthday.day && date.month() === birthday.month! - 1;
  })();

  const birthday = (() => {
    const dateOfBirth = character.dateOfBirth;
    let date = dayjs();
    let format = [];

    if (!dateOfBirth) return null;

    if (
      isFalsy(dateOfBirth.month) &&
      isFalsy(dateOfBirth.day) &&
      isFalsy(dateOfBirth.year)
    ) {
      return null;
    }

    if (!isFalsy(dateOfBirth.day)) {
      date = date.date(dateOfBirth.day!);
      format.push('DD');
    }

    if (!isFalsy(dateOfBirth.month)) {
      date = date.month(dateOfBirth.month! - 1);
      format.push('MM');
    }

    if (!isFalsy(dateOfBirth.year)) {
      date = date.year(dateOfBirth.year!);
      format.push('YYYY');
    }

    return date.format(format.join('/'));
  })();

  return (
    <View className="bg-thunder-950">
      <View className="mb-4 flex w-full flex-row items-center">
        <Button
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate('AnimeHome');
            }
          }}
          className="h-7 w-7 bg-transparent p-0"
        >
          <ArrowLeft size={28} color="white" />
        </Button>

        <View className="flex flex-1 flex-row items-center">
          <Text
            variant="lg"
            weight="semibold"
            className="ml-2 max-w-[70%]"
            numberOfLines={1}
          >
            {character!.name!.userPreferred}
          </Text>

          <View className="ml-2 flex flex-row items-center space-x-1">
            <SHeartIcon
              size={20}
              fill="currentColor"
              className="inline-block text-red-400"
            />

            <Text className="inline-block text-white" numberOfLines={1}>
              {formatNumberToAbbreviated(character.favourites ?? 0)}
            </Text>
          </View>

          {isBirthday ? (
            <SCakeIcon className="ml-2 inline-block h-4 w-4 text-pink-300" />
          ) : null}
        </View>
      </View>

      <View className="flex flex-row">
        <PlainCard
          coverImage={character!.image!.large!}
          className="aspect-[2/3] w-24"
        />

        <View className="ml-4 flex-1 space-y-1">
          <Text>
            <Text weight="semibold">Gender: </Text>

            <Text weight="normal">{character.gender || 'Unknown'}</Text>
          </Text>

          <Text>
            <Text weight="semibold">Age: </Text>

            <Text weight="normal">{character.age || 'Unknown'}</Text>
          </Text>

          {character.bloodType ? (
            <Text>
              <Text weight="semibold">Blood Type: </Text>

              <Text weight="normal">{character.bloodType}</Text>
            </Text>
          ) : null}

          <Text>
            <Text weight="semibold">Date of birth: </Text>

            <Text weight="normal">{birthday || 'Unknown'}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default InfoSection;
