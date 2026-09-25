import { z } from "zod";

export const ConfigSchema = z.object({
  save_directory: z.string(),
});

export type ConfigType = z.infer<typeof ConfigSchema>;
