import { addNote } from "../../note/addnote.ts";
import { input } from "@inquirer/prompts";
import { readdir } from "node:fs/promises";
import { select } from "@inquirer/prompts";
import { NOTE_DIR } from "../../constant/app.ts";
import consola from "consola";
import { bookSave } from "../../note/book/bookSave.ts";

export const add = async (): Promise<void> => {
  try {
    let selected: string;
    const filename = await input({
      message: "Enter a file name",
    });

    const CreateorSelect = await select({
      message: "create or select book?",
      choices: [
        { name: "create", value: "create" },
        { name: "select", value: "select" },
      ],
    });

    if (CreateorSelect === "create") {
      const createSel = await input({
        message: "Enter a book name",
      });

      bookSave(createSel);

      selected = createSel;
    }

    if (CreateorSelect === "select") {
      const choices = await readdir(NOTE_DIR);

      selected = await select({
        message: "select book",
        choices,
      });
    }

    await addNote(filename, selected);
  } catch (error) {
    consola.error(error);
  }
};
