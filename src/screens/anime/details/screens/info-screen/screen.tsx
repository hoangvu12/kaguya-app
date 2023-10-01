import React from 'react';

import type { Media } from '@/types/anilist';
import { MediaDescription, View } from '@/ui';

import CharacterList from './components/character-list';
import InfoSection from './components/info-section';
import RecommendationList from './components/recommendation-list';
import RelationList from './components/relation-list';
import SpecialRelationList from './components/special-relation-list';
import StaffList from './components/staff-list';
import SynonymList from './components/synonym-list';
import TagList from './components/tag-list';
import Trailer from './components/trailer';

interface InfoScreenProps {
  media: Media;
}

const InfoScreen: React.FC<InfoScreenProps> = ({ media }) => {
  return (
    <View className="space-y-8 pb-16">
      <InfoSection media={media} />

      <View>
        <MediaDescription description={media.description} />
      </View>

      <SpecialRelationList relations={media.relations} />

      <RelationList relations={media.relations} />
      <RecommendationList recommendations={media.recommendations} />

      <TagList tags={media.tags} />

      {media.trailer && media.trailer.site === 'youtube' && (
        <Trailer youtubeId={media.trailer.id} />
      )}

      <CharacterList characters={media.characters} />
      <StaffList staffList={media.staff} />

      <SynonymList synonyms={media.synonyms} />
    </View>
  );
};

export default InfoScreen;
