import * as FileSystem from 'expo-file-system';
import { createQuery } from 'react-query-kit';
import type { z } from 'zod';

import { MODULE_DIR } from '@/constants';
import { ModuleSchema } from '@/core/module';
import { ensureFolderExists } from '@/utils';
import { createParseJSONSchema } from '@/utils/zod';

const stringToJson = createParseJSONSchema(ModuleSchema);

const parseModule = async (moduleFolder: string) => {
  const files = await FileSystem.readDirectoryAsync(moduleFolder);

  const metadataFile = files.find((file) => file === 'metadata.json');

  if (!metadataFile) {
    throw new Error('No metadata file found');
  }

  const metadataString = await FileSystem.readAsStringAsync(
    `${moduleFolder}/${metadataFile}`
  );

  return stringToJson.parseAsync(metadataString);
};

const readModules = async () => {
  try {
    await ensureFolderExists(MODULE_DIR);

    const moduleDirectories = await FileSystem.readDirectoryAsync(MODULE_DIR);

    const parsedModules = await Promise.all(
      moduleDirectories
        .filter((dir) => !dir.includes('.'))
        .map((dir) => parseModule(MODULE_DIR + '/' + dir))
    );

    return parsedModules;
  } catch (err) {
    console.error(err);

    return [];
  }
};

const useModules = createQuery<z.infer<typeof ModuleSchema>[], null, Error>({
  primaryKey: 'modules',
  queryFn: () => {
    return readModules();
  },
});

export default useModules;
