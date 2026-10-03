import { writeFile, mkdir } from "node:fs/promises";
import { ROOT_DIR } from "../../constant/app.ts";
import consola from "consola";
import { z } from "zod";
import { TaskTagRead } from "./TaskTagRead.ts";

export const TagTypeSchema = z.array(z.string());
export type TagType = z.infer<typeof TagTypeSchema>;

export const TaskTagSave = async (tags: TagType): Promise<void> => {
  try {
    const readtag = await TaskTagRead();

    for (const tag of tags) {
      if (!readtag.includes(tag)) {
        readtag.push(tag);
      }
    }

    await mkdir(ROOT_DIR, { recursive: true });

    const tagsJson = JSON.stringify(readtag, null, 2);

    await writeFile(`${ROOT_DIR}/tags.json`, tagsJson, "utf-8");
  } catch (error) {
    consola.error(error);
  }
};
