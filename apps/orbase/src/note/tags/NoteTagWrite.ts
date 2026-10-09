import { writeFile } from "node:fs/promises";
import { getRootDir } from "../../constant/app.ts";
import consola from "consola";
import type { NoteTagType } from "./NoteTagSave.ts";

export const NoteTagWrite = async (tags: NoteTagType): Promise<void> => {
  try {
    const rootDir = await getRootDir();
    const tagsJson = JSON.stringify(tags, null, 2);
    await writeFile(`${rootDir}/book.json`, tagsJson, "utf-8");
  } catch (error) {
    consola.error(error);
  }
};
