import { writeFile, mkdir } from "node:fs/promises";
import { ROOT_DIR } from "../../constant/app.ts";
import consola from "consola";
import { z } from "zod";
import { NoteTagRead } from "./NoteTagRead.ts";

export const NoteTypeSchema = z.array(z.string());
export type NoteTagType = z.infer<typeof NoteTypeSchema>;

export const NoteTagSave = async (tags: NoteTagType): Promise<void> => {
  try {
    const readtag = await NoteTagRead();

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
