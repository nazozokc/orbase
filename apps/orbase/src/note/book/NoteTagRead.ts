import { readFile } from "node:fs/promises";
import { getRootDir } from "../../constant/app";
import { NoteTypeSchema, type NoteTagType } from "./NoteTagSave.ts";
import consola from "consola";

export const NoteTagRead = async (): Promise<NoteTagType> => {
  try {
    const tagsJson = await readFile(`${await getRootDir()}/book.json`, "utf-8");
    const parsedTags = JSON.parse(tagsJson);

    const result = NoteTypeSchema.safeParse(parsedTags);

    if (!result.success) {
      consola.error(result.error);
      return [];
    }

    return result.data as NoteTagType;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    consola.error(error);
    return [];
  }
};
