import { homedir } from "os";
import { CONFIG_DIR, CONFIG_DIR_NAME } from "../constant/appconfig.ts";
import type { ConfigType } from "./type.ts";
import { join } from "path";
import { writeFile, mkdir } from "node:fs/promises";

export const generateConfig = async (): Promise<void> => {
  const defaultSchema: ConfigType = {
    save_directory: join(`${homedir()}`, ".orbase"),
  };

  await mkdir(CONFIG_DIR, { recursive: true });
  const stringify = JSON.stringify(defaultSchema, null, 2);
  await writeFile(CONFIG_DIR_NAME, stringify, "utf-8");
};
