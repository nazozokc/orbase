import { writeFile } from "node:fs/promises";
import { ROOT_DIR } from "../../constant/app.ts";
import consola from "consola";
import type { NoteTagType } from "./NoteTagSave.ts";

export const NoteTagWrite = async (tags: NoteTagType): Promise<void> => {
  try {
    const tagsJson = JSON.stringify(tags, null, 2);
    await writeFile(`${ROOT_DIR}/book.json`, tagsJson, "utf-8");
  } catch (error) {
    consola.error(error);
  }
};
