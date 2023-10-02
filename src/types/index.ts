import type { z } from 'zod';

import type { ModuleSchema } from '@/core/module';

export type Module = z.infer<typeof ModuleSchema>;
