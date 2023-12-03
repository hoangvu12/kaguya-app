import { z } from 'zod';

import { ModuleSchema } from './module';

const IndexSchema = z.object({
  author: z.string(),
  name: z.string(),
  logo: z.string().url().optional(),
  modules: z.array(ModuleSchema.extend({ url: z.string().url() })),
});

export default IndexSchema;
