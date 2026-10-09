import { join } from "node:path";
import { readConfig } from "../config/configRead.ts";

export const CLI_COMMAND_NAME = "orbase";

export const getRootDir = async (): Promise<string> => {
  const config = await readConfig();
  return join(config.save_directory);
};

export const getTaskDir = async (): Promise<string> => {
  return join(String(await getRootDir()), "task");
};

export const getDiaryDir = async (): Promise<string> => {
  return join(String(await getRootDir()), "diary");
};

export const getTemplateDir = async (): Promise<string> => {
  return join(String(await getRootDir()), "template");
};

export const getNoteDir = async (): Promise<string> => {
  return join(String(await getRootDir()), "note");
};
