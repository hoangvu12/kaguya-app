import { Linking } from 'react-native';

import { graphql } from '@/gql';
import type { SaveMediaListEntryMutationVariables } from '@/gql/graphql';
import AnilistIcon from '@/screens/settings/components/icon/anilist-icon';
import anilistClient from '@/services/anilist';
import { paramsToObject } from '@/utils';

import type { BasicInfo, Token } from './core';
import Provider from './core';

const CLIENT_ID = '15403';

const viewerDocument = graphql(`
  query Viewer {
    Viewer {
      name
      avatar {
        medium
      }
      id
    }
  }
`);

const saveMediaListEntry = graphql(`
  mutation SaveMediaListEntry(
    $id: Int
    $mediaId: Int
    $status: MediaListStatus
    $score: Float
    $scoreRaw: Int
    $progress: Int
    $progressVolumes: Int
    $repeat: Int
    $priority: Int
    $private: Boolean
    $notes: String
    $hiddenFromStatusLists: Boolean
    $customLists: [String]
    $advancedScores: [Float]
    $startedAt: FuzzyDateInput
    $completedAt: FuzzyDateInput
  ) {
    SaveMediaListEntry(
      id: $id
      mediaId: $mediaId
      status: $status
      score: $score
      scoreRaw: $scoreRaw
      progress: $progress
      progressVolumes: $progressVolumes
      repeat: $repeat
      priority: $priority
      private: $private
      notes: $notes
      hiddenFromStatusLists: $hiddenFromStatusLists
      customLists: $customLists
      advancedScores: $advancedScores
      startedAt: $startedAt
      completedAt: $completedAt
    ) {
      progress
      score(format: POINT_10_DECIMAL)
      status
    }
  }
`);

export default class AnilistProvider extends Provider {
  constructor() {
    super({
      name: 'AniList',
      icon: AnilistIcon,
    });
  }

  async signIn(): Promise<void> {
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: 'token',
    }).toString();

    Linking.openURL(`https://anilist.co/api/v2/oauth/authorize?${params}`);
  }

  // kaguya://settings?provider=anilist#access_token=....&token_type=Bearer&expires_in=...
  async handleCode(url: string): Promise<Token> {
    const params = paramsToObject(url.split('#')[1]);

    const accessToken = params?.access_token as string;

    if (!accessToken) throw new Error('No access token found');

    return {
      accessToken,
    };
  }

  async getInfo(accessToken: string): Promise<BasicInfo & Record<string, any>> {
    const data = await anilistClient.request(
      viewerDocument,
      {},
      {
        authorization: `Bearer ${accessToken}`,
      }
    );

    if (!data?.Viewer) throw new Error('No viewer found');

    return {
      name: data?.Viewer?.name,
      avatar: data?.Viewer?.avatar?.medium || undefined,
      id: data.Viewer.id,
    };
  }

  updateEntry(
    ids: {
      malId: number | undefined;
      anilistId: number;
    },
    entry: Partial<SaveMediaListEntryMutationVariables>
  ): Promise<any> {
    return anilistClient.request(saveMediaListEntry, {
      mediaId: ids.anilistId,
      ...entry,
    });
  }
}
