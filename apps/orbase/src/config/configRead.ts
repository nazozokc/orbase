import { homedir } from "node:os";
import { CONFIG_DIR_NAME } from "../constant/appconfig.ts";
import { ConfigSchema, type ConfigType } from "./type.ts";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import consola from "consola";

const defaultConfig: ConfigType = {
  save_directory: join(`${homedir()}`, ".orbase"),
};

export const readConfig = async (): Promise<ConfigType> => {
  try {
    const configFileContent = await readFile(CONFIG_DIR_NAME, "utf-8");
    const parsedConfig = ConfigSchema.safeParse(JSON.parse(configFileContent));

    if (!parsedConfig.success) {
      consola.error(parsedConfig.error);
      return defaultConfig;
    }

    return parsedConfig.data;
  } catch (error) {
    return defaultConfig;
  }
};
