import { z } from "zod";

export const ConfigSchema = z.object({
  save_directory: z.string().optional(),
});

export type Config = z.infer<typeof ConfigSchema>;
