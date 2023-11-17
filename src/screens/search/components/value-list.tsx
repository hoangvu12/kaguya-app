import { useAtom } from 'jotai/react';
import { TagIcon } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { Button, removeArrayOfObjectDup, Text, View } from '@/ui';
import Chip from '@/ui/core/chip';

import {
  countryAtom,
  formatAtom,
  genresAtom,
  seasonAtom,
  sourceAtom,
  statusAtom,
  tagsAtom,
  yearAtom,
} from '../store';

const ValueList = () => {
  const [genres, setGenres] = useAtom(genresAtom);
  const [tags, setTags] = useAtom(tagsAtom);
  const [year, setYear] = useAtom(yearAtom);
  const [season, setSeason] = useAtom(seasonAtom);
  const [format, setFormat] = useAtom(formatAtom);
  const [country, setCountry] = useAtom(countryAtom);
  const [status, setStatus] = useAtom(statusAtom);
  const [source, setSource] = useAtom(sourceAtom);

  const [values, setValues] = React.useState<
    { type: string; value: string | number }[]
  >([]);

  const addValues = (values: { type: string; value: string | number }[]) => {
    setValues((prev) => {
      return removeArrayOfObjectDup([...prev, ...values], 'value');
    });
  };

  const handleRemove = (value: { type: string; value: string | number }) => {
    setValues((prev) =>
      prev.filter((el) => el.value !== value.value && el.type !== value.type)
    );

    switch (value.type) {
      case 'genre':
        setGenres((prev) => prev.filter((el) => el !== value.value));
        break;
      case 'tag':
        setTags((prev) => prev.filter((el) => el !== value.value));
        break;
      case 'year':
        setYear(undefined);
        break;
      case 'season':
        setSeason(undefined);
        break;
      case 'format':
        setFormat(undefined);
        break;
      case 'country':
        setCountry(undefined);
        break;
      case 'status':
        setStatus(undefined);
        break;
      case 'source':
        setSource(undefined);
        break;
    }
  };

  useEffect(() => {
    const values = genres.map((el) => ({
      type: 'genre',
      value: el,
    }));

    addValues(values);
  }, [genres]);

  useEffect(() => {
    const values = tags.map((el) => ({
      type: 'tag',
      value: el,
    }));

    addValues(values);
  }, [tags]);

  useEffect(() => {
    if (!year) return;

    addValues([{ type: 'year', value: year }]);
  }, [year]);

  useEffect(() => {
    if (!season) return;

    addValues([{ type: 'season', value: season }]);
  }, [season]);

  useEffect(() => {
    if (!format) return;

    addValues([{ type: 'format', value: format }]);
  }, [format]);

  useEffect(() => {
    if (!country) return;

    addValues([{ type: 'country', value: country }]);
  }, [country]);

  useEffect(() => {
    if (!status) return;

    addValues([{ type: 'status', value: status }]);
  }, [status]);

  useEffect(() => {
    if (!source) return;

    addValues([{ type: 'source', value: source }]);
  }, [source]);

  if (!values.length) return null;

  return (
    <View className="flex flex-row items-center">
      <View className="mr-3">
        <TagIcon size={24} color="white" />
      </View>

      <FlatList
        horizontal
        data={values}
        keyExtractor={(item) => `${item.value}-${item.type}`}
        renderItem={({ item }) => (
          <Button
            onPress={() => {
              handleRemove(item);
            }}
            className="self-start bg-transparent p-0"
          >
            <Chip>
              <Text className="text-xs text-white">{item.value}</Text>
            </Chip>
          </Button>
        )}
        ItemSeparatorComponent={() => <View className="w-1" />}
      />
    </View>
  );
};

export default ValueList;
