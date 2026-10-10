import { addNote } from "../../note/addnote.ts";
import { input } from "@inquirer/prompts";
import { readdir } from "node:fs/promises";
import { select } from "@inquirer/prompts";
import { getNoteDir } from "../../constant/app.ts";
import { mkdir } from "node:fs/promises";
import consola from "consola";
import { bookSave } from "../../note/book/bookSave.ts";

export const add = async (): Promise<void> => {
  try {
    const notedir = await getNoteDir();
    await mkdir(notedir, { recursive: true });
    let selected: string;
    const filename = await input({
      message: "Enter a file name",
    });

    const CreateOrSelect = await select({
      message: "create or select book?",
      choices: [
        { name: "create", value: "create" },
        { name: "select", value: "select" },
      ],
    });

    if (CreateOrSelect === "create") {
      const createSel = await input({
        message: "Enter a book name",
      });

      selected = createSel;
      await bookSave(createSel);
    } else {
      selected = "home";
    }
    if (CreateOrSelect === "select") {
      const choices = await readdir(notedir, { withFileTypes: true });

      selected = await select({
        message: "select book",
        choices: choices.map((map) => map.name),
      });
    }

    await addNote(filename, selected);
  } catch (error) {
    consola.error(error);
  }
};
