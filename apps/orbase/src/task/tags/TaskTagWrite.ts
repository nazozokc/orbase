import { writeFile, mkdir } from "node:fs/promises";
import { getRootDir } from "../../constant/app.ts";
import consola from "consola";
import type { TagType } from "./TaskTagSave.ts";

export const TaskTagWrite = async (tags: TagType): Promise<void> => {
  try {
    const rootDir = await getRootDir();
    await mkdir(rootDir, { recursive: true });
    const tagsJson = JSON.stringify(tags, null, 2);
    await writeFile(`${rootDir}/tags.json`, tagsJson, "utf-8");
  } catch (error) {
    consola.error(error);
  }
};
