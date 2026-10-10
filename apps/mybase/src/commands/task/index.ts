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
      args: {
        title: {
          type: "string",
          short: "t",
          description: "Task title",
          required: false,
        },
        detail: {
          type: "string",
          short: "t",
          description: "Task Detail",
          required: false,
        },
        dueDate: {
          type: "string",
          short: "d",
          description: "Task DueDate",
          required: false,
        },
        priority: {
          type: "string",
          short: "d",
          description: "Task priority",
          required: false,
        },
        tag: {
          type: "string[]",
          short: "d",
          description: "Task tag",
          required: false,
        },
        status: {
          type: "string",
          short: "d",
          description: "Task tag",
          required: false,
        },
      },

      run: (ctx) => {
        const { title, detail, dueDate, priority, tag, status } = ctx.values;

        add(title, detail, dueDate, priority, tag, status);
      },
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
      run: tagdel,
    },
  },
};
