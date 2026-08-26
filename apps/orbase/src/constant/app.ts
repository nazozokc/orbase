import { homedir } from "os";
import { join } from "node:path";

export const CLI_COMMAND_NAME = "orbase";
export const ROOT_DIR = join(`${homedir()}`, ".orbase");
export const TASK_DIR = join(`${homedir()}`, ".orbase", "task");
export const NOTE_DIR = join(`${homedir()}`, ".orbase", "note");
export const DIARY_DIR = join(`${homedir()}`, ".orbase", "diary");
export const TEMPLATE_DIR = join(`${homedir()}`, ".orbase", "template");
