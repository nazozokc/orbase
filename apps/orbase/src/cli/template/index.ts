import type { Command } from "gunshi";
import { template } from "./temp.ts";

export const templateCommand: Command = {
  name: "template",
  description: "copy a template",
  run: template,
};
