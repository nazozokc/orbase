import type { Command } from "gunshi";
import { generateConfig } from "../../config/generate.ts";

export const initCommand: Command = {
  name: "init",
  description: "init config file",
  run: generateConfig,
};
