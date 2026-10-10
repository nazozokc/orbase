import { z } from "zod";
import { isAbsolute } from "node:path";

// refineでisAbsolute(絶対パス)か検証
export const ConfigSchema = z.object({
  save_directory: z
    .string()
    .min(1, "Save directory must not be empty")
    .refine(isAbsolute, "Save directory must be an absolute path"),
});

export type ConfigType = z.infer<typeof ConfigSchema>;
