import { homedir } from "node:os";
import { CONFIG_DIR_NAME } from "../constant/appconfig.ts";
import { ConfigSchema, type ConfigType } from "./type.ts";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import path from "node:path";
import consola from "consola";

const defaultConfig: ConfigType = {
  save_directory: join(`${homedir()}`, ".orbase"),
};

export const readConfig = async (): Promise<ConfigType> => {
  try {
    const ConfigFileName = CONFIG_DIR_NAME;

    const configFileContent = await readFile(ConfigFileName, "utf-8");
    const parsedConfig = ConfigSchema.safeParse(JSON.parse(configFileContent));

    if (!parsedConfig.success) {
      consola.error(parsedConfig.error);
      return defaultConfig;
    }

    if (!path.isAbsolute(parsedConfig.data.save_directory)) {
      consola.error("save directory path is relative path");
      consola.error(
        "read config is default config, fix your config file early",
      );
    }

    return parsedConfig.data;
  } catch (error) {
    consola.error(error);
    consola.info("Failed readConfig");
    return defaultConfig;
  }
};
