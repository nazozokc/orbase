import { join } from "path";
import { ConfigSchema, type Config } from "./type.ts";
import { ROOT_DIR } from "../constant/app.ts";
import { readFile } from "node:fs/promises";
import { consola } from "consola";

export const configRead = async (): Promise<Config | void> => {
  const configDirJoin = join(ROOT_DIR, "config.json");
  const configFileRead = await readFile(configDirJoin, "utf-8");

  try {
    const configFileResultParse = JSON.parse(configFileRead);
    const configFileResult = ConfigSchema.safeParse(configFileResultParse);

    if (!configFileResult.success) {
      consola.error(configFileResult.error);
      return;
    }

    const configResultSuccess = configFileResult.data;
    return configResultSuccess;
  } catch (error) {
    consola.error(error);
  }
};
