import { readFile } from "node:fs/promises";
import { getRootDir } from "../../constant/app.ts";
import { TagTypeSchema, type TagType } from "./TaskTagSave.ts";
import consola from "consola";

export const TaskTagRead = async (): Promise<TagType> => {
  try {
    const rootDir = await getRootDir();
    const tagsJson = await readFile(`${rootDir}/tags.json`, "utf-8");
    const parsedTags: unknown = JSON.parse(tagsJson);

    const result = TagTypeSchema.safeParse(parsedTags);

    if (!result.success) {
      consola.error(result.error);
      return [];
    }

    return result.data;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    consola.error(error);
    return [];
  }
};
