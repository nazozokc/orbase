import type { Command } from "gunshi";
import { add } from "./add.ts";
import { edit } from "./edit.ts";
import { del } from "./del.ts";

export const diaryCommand: Command = {
  name: "diary",
  description: "Record a diary entry",

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
  },
};
