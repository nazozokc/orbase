import type { Command } from "gunshi";
import { add } from "./add.ts";
import { del } from "./del.ts";
import { priority } from "./priority.ts";
import { edit } from "./edit.ts";
import { taskTable } from "../../task/table.ts";

const Table = async (): Promise<void> => {
  await taskTable();
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
      run: Table,
    },
  },
};
