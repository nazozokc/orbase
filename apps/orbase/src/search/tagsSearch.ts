import { TASK_DIR, NOTE_DIR } from "../constant/app.ts";
import { type MarkdownMeta } from "../note/type.ts";
import { readFile, readdir } from "node:fs/promises";
import { join } from "path";
import { consola } from "consola";
import matter from "gray-matter";

export const tagsString = async (search: string): Promise<void> => {
  try {
    const task = await readdir(TASK_DIR, "utf-8");

    for (const task_file of task) {
      const path = join(TASK_DIR, task_file);
      const task = await readFile(path, "utf-8");
      const parse = JSON.parse(task);
      const tags = parse.tag;

      if (tags.includes(search)) {
        consola.log(path);
      }
    }

    const notes = await readdir(NOTE_DIR, "utf-8");

    for (const note_file of notes) {
      const path = join(NOTE_DIR, note_file);
      const content = await readFile(path, "utf-8");
      const mdtags = matter(content);
      const meta = mdtags.data as MarkdownMeta;

      if (meta.tags.includes(search)) {
        consola.log(path);
      }
    }
  } catch (error) {
    consola.error(error);
  }
};
