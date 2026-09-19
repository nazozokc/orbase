import { define } from "gunshi";
import { template } from "./temp.ts";

export const templateCommand = define({
  name: "template",
  description: "copy a template",
  args: {
    temp: {
      type: "string",
      description: "template_name",
      required: true,
    },
  },

  async run(ctx) {
    const temp = ctx.values.temp;

    await template(temp);
  },
});
