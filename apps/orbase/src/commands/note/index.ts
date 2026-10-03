import type { Command } from "gunshi";
import { add } from "./add.ts";
import { del } from "./del.ts";
import { edit } from "./edit.ts";
import { tagdel } from "./tagdel.ts";

export const noteCommand: Command = {
  name: "note",
  description: "Manage notes",

  subCommands: {
    add: {
      name: "add",
      run: add,
    },

    edit: {
      name: "edit",
      run: edit,
    },

    del: {
      name: "del",
      run: del,
    },

    tagdel: {
      name: "tagdel",
      args: {
        tagdelarg: {
          type: "string",
          description: "tagdelarg_name",
          required: true,
        },
      },

      async run(ctx) {
        const tagdelctx = ctx.values.tagdelarg;

        await tagdel(tagdelctx);
      },
    },
  },
};
