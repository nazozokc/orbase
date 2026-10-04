import { writeFile } from "node:fs/promises";
import { ROOT_DIR } from "../../constant/app.ts";
import consola from "consola";
import type { TagType } from "./TaskTagSave.ts";

export const TaskTagWrite = async (tags: TagType): Promise<void> => {
  try {
    const tagsJson = JSON.stringify(tags, null, 2);
    await writeFile(`${ROOT_DIR}/tags.json`, tagsJson, "utf-8");
  } catch (error) {
    consola.error(error);
  }
};
