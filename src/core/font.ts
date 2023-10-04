import { z } from 'zod';

import { FileUrlSchema } from './file-url';

export const FontSchema = z.object({
  file: FileUrlSchema,
  name: z.string(),
});
