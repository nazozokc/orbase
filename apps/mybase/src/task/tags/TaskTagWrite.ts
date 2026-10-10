import { writeFile, mkdir, rename } from "node:fs/promises";
import { getRootDir } from "../../constant/app.ts";
import consola from "consola";
import type { TagType } from "./TaskTagSave.ts";
import { join } from "node:path";

export const TaskTagWrite = async (tags: TagType): Promise<void> => {
  try {
    const rootDir = await getRootDir();
    await mkdir(rootDir, { recursive: true });
    const tagsJson = JSON.stringify(tags, null, 2);
    const tmpPath = join(rootDir, "tags.json.tmp");
    const FilePath = join(rootDir, "tags.json");
    await writeFile(tmpPath, tagsJson, "utf-8");
    await rename(tmpPath, FilePath);
  } catch (error) {
    consola.error(error);
  }
};
