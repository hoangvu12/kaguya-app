import * as FileSystem from 'expo-file-system';
import { unzip } from 'react-native-zip-archive';

import { ModuleSchema } from '@/core/module';

import { createParseJSONSchema } from './zod';

const stringToJson = createParseJSONSchema(ModuleSchema);

const ensureFolderExists = (path: string) => {
  return FileSystem.getInfoAsync(path).then(async ({ exists }) => {
    if (!exists) {
      await FileSystem.makeDirectoryAsync(path, { intermediates: true });
    }

    return path;
  });
};

const randomString = () => {
  return Math.random().toString(36).substring(7);
};

export const parseKModule = async (filePath: string) => {
  let actualFilePath = '';

  // If the filePath is not .kmodule, then it must be a content:// URI
  // URI that when the user open the app by opening the .kmodule
  if (!filePath.endsWith('.kmodule')) {
    if (!filePath.startsWith('content://')) {
      throw new Error('File must be a .kmodule file!');
    }

    const randomName = randomString();

    const newPath = `${FileSystem.cacheDirectory}${randomName}.kmodule`;

    await FileSystem.copyAsync({
      from: filePath,
      to: newPath,
    });

    actualFilePath = newPath;
  } else {
    actualFilePath = filePath;
  }

  const renamedUri = actualFilePath.replace('.kmodule', '.zip');

  await FileSystem.moveAsync({
    from: actualFilePath,
    to: renamedUri,
  });

  const temporaryFolderName = randomString();

  const cacheModuleDir = FileSystem.cacheDirectory + 'modules';
  const cacheModuleZipDir = `${cacheModuleDir}/${temporaryFolderName}`;

  await ensureFolderExists(cacheModuleZipDir);

  await unzip(renamedUri, cacheModuleZipDir);

  const files = await FileSystem.readDirectoryAsync(cacheModuleZipDir);

  if (!files.includes('metadata.json')) {
    throw new Error("Metadata file doesn't exist!");
  }

  const metadataParse = await stringToJson.safeParseAsync(
    await FileSystem.readAsStringAsync(cacheModuleZipDir + '/metadata.json')
  );

  if (!metadataParse.success) {
    throw new Error(`Metadata file parsing failed! (${metadataParse.error})`);
  }

  const metadata = metadataParse.data;

  return { metadata, path: cacheModuleZipDir };
};

export const processKModule = async (moduleId: string, zipDir: string) => {
  const moduleDir = FileSystem.documentDirectory + 'modules/' + moduleId;

  await ensureFolderExists(moduleDir);

  await moveFiles(zipDir, moduleDir);

  await FileSystem.deleteAsync(zipDir);

  const newFiles = await FileSystem.readDirectoryAsync(moduleDir);

  if (!newFiles?.length) {
    throw new Error('Moving module files failed');
  }

  return true;
};

const moveFiles = async (sourceDir: string, destDir: string) => {
  const files = await FileSystem.readDirectoryAsync(sourceDir);

  for (const file of files) {
    const sourcePath = `${sourceDir}/${file}`;
    const destPath = `${destDir}/${file}`;

    await FileSystem.moveAsync({
      from: sourcePath,
      to: destPath,
    });
  }
};

export const getModuleDir = (moduleId: string) => {
  return FileSystem.documentDirectory + 'modules/' + moduleId;
};

export const getModuleFilePath = (moduleId: string, fileName: string) => {
  return FileSystem.documentDirectory + 'modules/' + moduleId + '/' + fileName;
};
