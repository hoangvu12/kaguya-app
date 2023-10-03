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

export const parseKModule = async (filePath: string) => {
  if (!filePath.endsWith('.kmodule')) {
    throw new Error('File must be a .kmodule file!');
  }

  const renamedUri = filePath.replace('.kmodule', '.zip');
  const fileName = filePath.split('/').pop();
  const fileNameWithoutExtension = fileName
    ?.split('.')
    .shift()
    ?.replaceAll('-', '');

  await FileSystem.moveAsync({
    from: filePath,
    to: renamedUri,
  });

  const cacheModuleDir = FileSystem.cacheDirectory + 'modules';
  const cacheModuleZipDir = `${cacheModuleDir}/${fileNameWithoutExtension}`;

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

  console.log(moduleDir, zipDir);

  const files = await FileSystem.readDirectoryAsync(zipDir);

  console.log('zipDir', files);

  await ensureFolderExists(moduleDir);

  await moveFiles(zipDir, moduleDir);

  await FileSystem.deleteAsync(zipDir);

  const newFiles = await FileSystem.readDirectoryAsync(moduleDir);

  console.log('moduleDirs', newFiles);

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
