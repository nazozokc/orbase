import { writeFile, rename } from "node:fs/promises";
import { getRootDir } from "../../constant/app.ts";
import consola from "consola";
import type { NoteTagType } from "./NoteTagSave.ts";
import { join } from "node:path";

export const NoteTagWrite = async (tags: NoteTagType): Promise<void> => {
  try {
    const rootDir = await getRootDir();
    const tmpPath = join(rootDir, "book.json.tmp");
    const filePath = join(rootDir, "book.json");
    const tagsJson = JSON.stringify(tags, null, 2);
    await writeFile(tmpPath, tagsJson, "utf-8");
    await rename(tmpPath, filePath);
  } catch (error) {
    consola.error(error);
  }
};
