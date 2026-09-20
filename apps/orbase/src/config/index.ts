import { configRead } from "./ConfigRead";
import type { Config } from "./type";

export const ROOT_DIR_SETTING = async (): Promise<Config["save_directory"]> => {
  const configFunctionRead = await configRead();

  return configFunctionRead.save_directory;
};
