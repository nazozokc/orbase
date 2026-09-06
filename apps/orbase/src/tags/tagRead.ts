import { readFile } from "node:fs/promises";
import { ROOT_DIR } from "../constant/app";
import { TagTypeSchema, type TagType } from "./tagSave";
import consola from "consola";

export const tagRead = async (): Promise<TagType> => {
  try {
    const tagsJson = await readFile(`${ROOT_DIR}/tags.json`, "utf-8");
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
