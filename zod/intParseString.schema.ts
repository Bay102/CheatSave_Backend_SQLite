import { z } from 'zod';

export const intParsableString = z
  .string({
    errorMap: () => ({
      message: 'dogId must be a string that is parseable into an integer',
    }),
  })
  .refine((s) => {
    try {
      if (Number.isNaN(parseInt(s))) {
        throw new Error('Not a number');
      }
      return true;
    } catch {
      return false;
    }
  });
