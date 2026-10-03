import type { Command } from "gunshi";
import { add } from "./add.ts";
import { del } from "./del.ts";
import { priority } from "./priority.ts";
import { edit } from "./edit/index.ts";
import { tagdel } from "./tagdel.ts";
import { filterTasksByStatus } from "./status.ts";
import { displayTaskTable } from "../../task/table.ts";

const listTasks = async (): Promise<void> => {
  await displayTaskTable();
};

export const taskCommand: Command = {
  name: "task",
  description: "Manage tasks",

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

    priority: {
      name: "priority",
      run: priority,
    },

    list: {
      name: "list",
      run: listTasks,
    },

    status: {
      name: "status",
      run: filterTasksByStatus,
    },

    tagdel: {
      name: "tagdel",
      args: {
        tagdel: {
          type: "string",
          description: "tagdelarg_name",
          required: true,
        },
      },

      async run(ctx) {
        const tagdelctx = ctx.values.tagdel;

        await tagdel(tagdelctx);
      },
    },
  },
};
