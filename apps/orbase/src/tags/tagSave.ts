import { writeFile, mkdir } from "node:fs/promises";
import { ROOT_DIR } from "../constant/app.ts";
import consola from "consola";
import z from "zod";

export const TagTypeSchema = z.string().or(z.array(z.string()));
export type TagType = string[];

export const tagSave = async (tags: TagType): Promise<void> => {
  try {
    const result = TagTypeSchema.safeParse(tags);

    if (!result.success) {
      consola.error(result);
      return;
    }

    await mkdir(ROOT_DIR, { recursive: true });
    const tagsJson = JSON.stringify(result, null, 2);
    await writeFile(`${ROOT_DIR}/tags.json`, tagsJson, "utf-8");
  } catch (error) {
    consola.error(error);
    return;
  }
};
