import { MMKV } from 'react-native-mmkv';
import { z } from 'zod';

import { createParseJSONSchema } from '@/utils/zod';

const MAPPING_NAMESPACE = 'kaguya_mapping';

const MappingSchema = z.object({
  anilistId: z.number(),
  mediaId: z.string(),
  extra: z.record(z.string()).optional(),
  moduleId: z.string(),
});

const storage = new MMKV();

const parseJSON = createParseJSONSchema(z.array(MappingSchema));

export type Mapping = z.infer<typeof MappingSchema>;

export function getMediaId(
  anilistId: number,
  moduleId: string
): Mapping | undefined {
  try {
    const mappings = getMappings();

    const mapping = mappings.find(
      (media) => media?.moduleId === moduleId && media.anilistId === anilistId
    );

    return mapping;
  } catch (err) {
    console.error('Failed to get mapping', err);

    return undefined;
  }
}

export function saveMapping({
  anilistId,
  mediaId,
  moduleId,
  extra,
}: {
  anilistId: number;
  moduleId: string;
  mediaId: string;
  extra?: Record<string, string>;
}) {
  try {
    const mappings = getMappings();

    const mapping = mappings.find(
      (media) => media?.moduleId === moduleId && media.anilistId === anilistId
    );

    if (mapping) {
      mapping.mediaId = mediaId;
    } else {
      mappings.push({ anilistId, moduleId, mediaId, extra });
    }

    storage.set(MAPPING_NAMESPACE, JSON.stringify(mappings));

    return true;
  } catch (err) {
    console.error('Failed to save mapping', err);

    return false;
  }
}

export function getMappings(): Mapping[] {
  try {
    const data = storage.getString(MAPPING_NAMESPACE);

    if (!data) return [];

    const parsedData = parseJSON.safeParse(data);

    if (!parsedData.success) return [];

    return parsedData.data;
  } catch (err) {
    console.error('Failed to get mappings', err);

    return [];
  }
}
