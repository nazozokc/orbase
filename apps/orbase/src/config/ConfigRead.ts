import { join } from "path";
import { ConfigSchema, type Config } from "./type.ts";
import { ROOT_DIR } from "../constant/app.ts";
import { readFile } from "node:fs/promises";
import { consola } from "consola";

export const configRead = async (): Promise<Config> => {
  const configDirJoin = join(ROOT_DIR, "config.json");
  const configFileRead = await readFile(configDirJoin, "utf-8");
  const defaultConfig: Config = {
    save_directory: ".orbase",
  };

  try {
    const configFileResult = ConfigSchema.safeParse(JSON.parse(configFileRead));

    if (!configFileResult.success) {
      consola.error(configFileResult.error);
      return defaultConfig;
    }

    const configResultSuccess = configFileResult.data;
    return configResultSuccess;
  } catch (error) {
    return defaultConfig;
  }
};
