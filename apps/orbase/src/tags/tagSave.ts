import { writeFile, mkdir } from "node:fs/promises";
import { ROOT_DIR } from "../constant/app.ts";
import consola from "consola";

export type TagType = string[];

export const tagSave = async (tags: TagType): Promise<void> => {
  try {
    await mkdir(ROOT_DIR, { recursive: true });
    const tagsJson = JSON.stringify(tags, null, 2);
    await writeFile(`${ROOT_DIR}/tags.json`, tagsJson, "utf-8");
  } catch (error) {
    consola.error(error);
    return;
  }
};
