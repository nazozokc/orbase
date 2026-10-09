import { getNoteDir } from "../../constant/app.ts";
import { readdir } from "node:fs/promises";
import { select } from "@inquirer/prompts";
import { join } from "node:path";
import openeditor from "open-editor";

export const edit = async (): Promise<void> => {
  const noteDir = await getNoteDir();
  const bookNames = await readdir(noteDir);
  const selectedBook = await select({
    message: "select book",
    choices: bookNames,
  });

  const Path = join(noteDir, selectedBook);

  const selectedFile = await readdir(Path);

  const selected = await select({
    message: "Select to edit memo",
    choices: selectedFile,
  });

  await openeditor([
    {
      file: join(noteDir, selectedBook, selected),
      line: 1,
      column: 1,
    },
  ]);
};
