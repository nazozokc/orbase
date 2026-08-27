import type { Command } from "gunshi";
import { template } from "./temp.ts";

export const templateCommand: Command = {
  name: "template",
  description: "copy a template",
  args: {
    temp: {
      type: "positional",
      description: "template name",
    },
  },

  async run(ctx) {
    const temp = ctx.values.temp;

    await template(temp);
  },
};
