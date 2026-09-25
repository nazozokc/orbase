import { define } from "gunshi";
import { copyTemplate } from "./temp.ts";

export const templateCommand = define({
  name: "template",
  description: "copy a template",
  args: {
    templateName: {
      type: "string",
      description: "template_name",
      required: true,
    },
  },

  async run(ctx) {
    const templateName = ctx.values.templateName;

    await copyTemplate(templateName);
  },
});
