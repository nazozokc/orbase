import { NOTE_DIR } from "../../constant/app.ts";
import { readdir } from "node:fs/promises";
import { select } from "@inquirer/prompts";
import { join } from "node:path";
import openeditor from "open-editor";

export const edit = async (): Promise<void> => {
  const choicesBook = await readdir(NOTE_DIR);
  const selectedBook = await select({
    message: "select book",
    choices: choicesBook,
  });

  const Path = join(NOTE_DIR, selectedBook);

  const selectedFile = await readdir(Path);

  const selected = await select({
    message: "Select to edit memo",
    choices: selectedFile
      .filter((file) => file.endsWith(".md"))
      .map((file) => ({
        name: file.replace(/\.md$/, ""),
        value: file,
      })),
  });

  await openeditor([
    {
      file: join(NOTE_DIR, selected),
      line: 1,
      column: 1,
    },
  ]);
};
