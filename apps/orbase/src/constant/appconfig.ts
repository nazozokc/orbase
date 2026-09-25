import { join } from "node:path";
import { homedir } from "node:os";

export const CONFIG_DIR_NAME = join(
  `${homedir()}`,
  ".config",
  "orbase",
  "config.json",
);

export const CONFIG_DIR = join(`${homedir()}`, ".config", "orbase");
