import { join } from "node:path";
import { homedir } from "node:os";
import { readConfig } from "../config/configRead.ts";

export const CLI_COMMAND_NAME = "orbase";
const config = await readConfig();
export const CONFIG_DIR_NAME = join(
  `${homedir()}`,
  ".config",
  "orbase",
  "config.json",
);

export const CONFIG_DIR = join(`${homedir()}`, ".config", "orbase");
export const ROOT_DIR = join(config.save_directory);
export const TASK_DIR = join(ROOT_DIR, "task");
export const NOTE_DIR = join(ROOT_DIR, "note");
export const DIARY_DIR = join(ROOT_DIR, "diary");
export const TEMPLATE_DIR = join(ROOT_DIR, "template");
