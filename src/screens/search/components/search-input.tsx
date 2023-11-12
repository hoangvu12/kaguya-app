import { useAtom } from 'jotai/react';
import React, { useEffect } from 'react';

import { colors, View } from '@/ui';
import Input from '@/ui/core/input';

import { keywordAtom } from '../store';

const SearchInput = () => {
  const [keyword, setKeyword] = useAtom(keywordAtom);
  const [innerKeyword, setInnerKeyword] = React.useState<string>(keyword);

  useEffect(() => {
    setInnerKeyword(keyword);
  }, [keyword]);

  return (
    <View className="mr-2 grow rounded-md bg-thunder-800">
      <Input
        className="rounded-md border-0 font-semibold text-white"
        placeholder="Search your favourite show"
        cursorColor={colors.neutral[300]}
        placeholderTextColor={colors.neutral[400]}
        value={innerKeyword}
        onChange={(e) => {
          setInnerKeyword(e.nativeEvent.text);
        }}
        onBlur={() => {
          setKeyword(innerKeyword);
        }}
      />
    </View>
  );
};

export default SearchInput;
