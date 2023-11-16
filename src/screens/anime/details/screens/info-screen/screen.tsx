import React from 'react';

import type { FragmentType } from '@/gql';
import { graphql, useFragment } from '@/gql';
import { View } from '@/ui';
import { MediaDescription } from '@/ui/media-description';

import CharacterList from './components/character-list';
import InfoSection from './components/info-section';
import RecommendationList from './components/recommendation-list';
import RelationList from './components/relation-list';
import SpecialRelationList from './components/special-relation-list';
import StaffList from './components/staff-list';
import SynonymList from './components/synonym-list';
import TagList from './components/tag-list';
import Trailer from './components/trailer';

export const InfoScreenFragment = graphql(`
  fragment InfoScreenMedia on Media {
    relations {
      edges {
        ...SpecialRelationListMedia
        ...RelationListMedia
      }
    }
    recommendations(page: 1, perPage: 15) {
      ...RecommendationListMedia
    }
    characters {
      ...CharacterListMedia
    }
    staff {
      ...StaffListMedia
    }
    tags {
      ...TagListMedia
    }
    description
    trailer {
      id
      site
    }
    synonyms
    ...InfoSectionMedia
  }
`);

interface InfoScreenProps {
  media: FragmentType<typeof InfoScreenFragment>;
}

const InfoScreen: React.FC<InfoScreenProps> = ({ media: mediaProps }) => {
  const media = useFragment(InfoScreenFragment, mediaProps);

  const relationEdges = media.relations?.edges?.filter(Boolean) ?? [];
  const recommendations = media.recommendations!;
  const tags = media.tags?.filter(Boolean) ?? [];
  const characters = media.characters!;
  const staff = media.staff!;
  const synonyms = media.synonyms?.filter(Boolean) ?? [];

  return (
    <View className="space-y-8 pb-16">
      <InfoSection media={media} />

      <View>
        <MediaDescription description={media.description!} />
      </View>

      <SpecialRelationList relations={relationEdges} />

      <RelationList relations={relationEdges} />
      <RecommendationList recommendations={recommendations} />

      <TagList tags={tags} />

      {media.trailer && media.trailer.site === 'youtube' && media.trailer.id ? (
        <Trailer youtubeId={media.trailer.id} />
      ) : null}

      <CharacterList characters={characters} />
      <StaffList staffList={staff} />

      <SynonymList synonyms={synonyms} />
    </View>
  );
};

export default React.memo(InfoScreen);
