import { writeFile, mkdir } from "node:fs/promises";
import { ROOT_DIR } from "../constant/app.ts";
import consola from "consola";
import z from "zod";
import { tagRead } from "./tagRead.ts";

export const TagTypeSchema = z.string().or(z.array(z.string()));
export type TagType = string[];

export const tagSave = async (tags: TagType): Promise<void> => {
  try {
    const readtag = await tagRead();

    for (const result of readtag) {
      for (const tag of tags) {
        if (!result.includes(tag)) {
          readtag.push(tag);
        }
      }
    }

    await mkdir(ROOT_DIR, { recursive: true });
    const tagsJson = JSON.stringify(readtag, null, 2);
    await writeFile(`${ROOT_DIR}/tags.json`, tagsJson, "utf-8");
  } catch (error) {
    consola.error(error);
    return;
  }
};
