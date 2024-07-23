import { z } from 'zod';

export const createGroupSchema = z.object({
  groupName: z.string().min(2).max(50),
  groupDescription: z.string().min(2).max(400),
});
