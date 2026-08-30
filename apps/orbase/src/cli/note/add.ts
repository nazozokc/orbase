import { addNote } from "../../note/addnote.ts";
import { input } from "@inquirer/prompts";
import { readdir } from "node:fs/promises";
import { select } from "@inquirer/prompts";
import { NOTE_DIR } from "../../constant/app.ts";

export const add = async (): Promise<void> => {
  const filename = await input({
    message: "Enter a file name",
  });

  const choices = [];

  const read = await readdir(NOTE_DIR);

  for (const Path of read) {
    choices.push(Path);
  }

  const selected = await select({
    message: "select books",
    choices,
  });

  await addNote(filename, selected);
};
