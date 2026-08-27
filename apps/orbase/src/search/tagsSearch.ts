import { TASK_DIR, NOTE_DIR } from "../constant/app.ts";
import { type MarkdownMeta } from "../note/type.ts";
import { readFile, readdir } from "node:fs/promises";
import { join } from "path";
import { consola } from "consola";
import matter from "gray-matter";

export const searchTags = async (search: string): Promise<void> => {
  try {
    const taskFiles = await readdir(TASK_DIR, "utf-8");

    for (const taskFile of taskFiles) {
      const path = join(TASK_DIR, taskFile);
      const taskJson = await readFile(path, "utf-8");
      const task = JSON.parse(taskJson);
      const tags = task.tag;

      if (tags.includes(search)) {
        consola.log(path);
      }
    }

    const notes = await readdir(NOTE_DIR, "utf-8");

    for (const noteFile of notes) {
      const path = join(NOTE_DIR, noteFile);
      const content = await readFile(path, "utf-8");
      const parsedMarkdown = matter(content);
      const meta = parsedMarkdown.data as MarkdownMeta;

      if (meta.tags.includes(search)) {
        consola.log(path);
      }
    }
  } catch (error) {
    consola.error(error);
  }
};
