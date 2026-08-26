import { checkbox } from "@inquirer/prompts";
import { deleteNote } from "../../note/deletenote.ts";
import { NOTE_DIR } from "../../constant/app.ts";
import { readdir } from "node:fs/promises";
import { consola } from "consola";

export const del = async (): Promise<void> => {
  try {
    const noteFiles = await readdir(NOTE_DIR);
    const choices = [];

    for (const sel of noteFiles) {
      choices.push({
        name: sel, // 画面に表示される
        value: sel, // 選択時に返ってくる値
      });
    }

    const selected = await checkbox({
      message: "select memo",
      choices,
    });

    for (const file of selected) {
      await deleteNote(file);
    }
  } catch (error) {
    consola.error(error);
  }
};
