import { checkbox, select } from "@inquirer/prompts";
import { deleteNote } from "../../note/deletenote.ts";
import { NOTE_DIR } from "../../constant/app.ts";
import { readdir } from "node:fs/promises";
import { consola } from "consola";
import { join } from "node:path";

export const del = async (): Promise<void> => {
  try {
    const noteDirs = await readdir(NOTE_DIR);
    const bookChoices = [];

    for (const bookName of noteDirs) {
      bookChoices.push({
        name: bookName,
        value: bookName,
      });
    }

    const selectedBooks = await select({
      message: "select book",
      choices: bookChoices,
    });

    const noteFilesPath = join(NOTE_DIR, selectedBooks);
    const noteFiles = await readdir(noteFilesPath);
    const noteChoices = [];

    for (const noteFileName of noteFiles) {
      noteChoices.push({
        name: noteFileName,
        value: noteFileName,
      });
    }
    const selected = await checkbox({
      message: "select book",
      choices: noteChoices,
    });

    for (const file of selected) {
      await deleteNote(file, selectedBooks);
    }
  } catch (error) {
    consola.error(error);
  }
};
