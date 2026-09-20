import { join } from "node:path";
import { ROOT_DIR_SETTING } from "../config";
import { homedir } from "node:os";
const ROOT_DIR_CONFIG = await ROOT_DIR_SETTING();

export const CLI_COMMAND_NAME = "orbase";
export const DEFAULT_ROOT_DIR = join(`${homedir()}`, ".orbase");
export const ROOT_DIR = join(ROOT_DIR_CONFIG ?? DEFAULT_ROOT_DIR);
export const TASK_DIR = join(ROOT_DIR, "task");
export const NOTE_DIR = join(ROOT_DIR, "note");
export const DIARY_DIR = join(ROOT_DIR, "diary");
export const TEMPLATE_DIR = join(ROOT_DIR, "template");
