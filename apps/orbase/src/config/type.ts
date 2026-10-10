import { z } from "zod";

export const ConfigSchema = z.object({
  save_directory: z.string().min(1),
});

export type ConfigType = z.infer<typeof ConfigSchema>;
