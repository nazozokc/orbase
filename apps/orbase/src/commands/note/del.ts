import { checkbox, select } from "@inquirer/prompts";
import { deleteNote } from "../../note/deletenote.ts";
import { NOTE_DIR } from "../../constant/app.ts";
import { readdir } from "node:fs/promises";
import { consola } from "consola";
import { join } from "node:path";

export const del = async (): Promise<void> => {
  try {
    const noteDirs = await readdir(NOTE_DIR);
    const choicesBook = [];

    for (const sel of noteDirs) {
      choicesBook.push({
        name: sel, // 画面に表示される
        value: sel, // 選択時に返ってくる値
      });
    }

    const selectedBooks = await select({
      message: "select book",
      choices: choicesBook,
    });

    const noteFilesPath = join(NOTE_DIR, selectedBooks);
    const noteFiles = await readdir(noteFilesPath);
    const choicesFiles = [];

    for (const selfile of noteFiles) {
      choicesFiles.push({
        name: selfile,
        value: selfile,
      });
    }
    const selected = await checkbox({
      message: "select book",
      choices: choicesFiles,
    });

    for (const file of selected) {
      await deleteNote(file, selectedBooks);
    }
  } catch (error) {
    consola.error(error);
  }
};
