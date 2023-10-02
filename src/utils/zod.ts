import type { ZodType } from 'zod';
import { z } from 'zod';

export const createParseJSONSchema = <T extends ZodType<any, any, any>>(
  schema: T
) => {
  return z.string().transform((str, ctx): z.infer<typeof schema> => {
    try {
      return JSON.parse(str);
    } catch (e) {
      ctx.addIssue({ code: 'custom', message: 'Invalid JSON' });
      return z.NEVER;
    }
  });
};
