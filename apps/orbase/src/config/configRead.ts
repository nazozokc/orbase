import { homedir } from "node:os";
import { CONFIG_DIR_NAME, ROOT_DIR } from "../constant/app.ts";
import { ConfigSchema, type ConfigType } from "./type.ts";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import consola from "consola";

const defaultConfig: ConfigType = {
  save_directory: join(`${homedir()}`, ".orbase"),
};

export const ConfigRead = async (): Promise<ConfigType> => {
  const ConfigFileName = CONFIG_DIR_NAME;
  const ConfigFileRead = await readFile(ConfigFileName, "utf-8");
  const stringifySchema = ConfigSchema.safeParse(JSON.parse(ConfigFileRead));

  if (!stringifySchema.success) {
    consola.error(stringifySchema.error);
    return defaultConfig;
  }

  return stringifySchema.data;
};
