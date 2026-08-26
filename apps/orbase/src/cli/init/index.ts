import type { Command } from "gunshi";
import { init } from "./init.ts";

export const initCommand: Command = {
  name: "init",
  description: "add init",
  run: init,
};
