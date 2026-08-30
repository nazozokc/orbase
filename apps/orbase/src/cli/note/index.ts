import type { Command } from "gunshi";
import { add } from "./add.ts";
import { del } from "./del.ts";
import { edit } from "./edit.ts";
import { book } from "./book/index.ts";

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

    book: {
      name: "book",
      run: book,
    },
  },
};
