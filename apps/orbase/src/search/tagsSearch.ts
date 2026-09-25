import { TASK_DIR, NOTE_DIR } from "../constant/app.ts";
import { MarkdownMetaSchema, type MarkdownMeta } from "../note/type.ts";
import { readFile, readdir } from "node:fs/promises";
import { join } from "path";
import { consola } from "consola";
import matter from "gray-matter";
import { TaskSchema } from "../task/type.ts";

export const searchTags = async (tagName: string): Promise<void> => {
  const taskFiles = await readdir(TASK_DIR, "utf-8");

  for (const taskFile of taskFiles) {
    const taskFilePath = join(TASK_DIR, taskFile);
    const taskJson = await readFile(taskFilePath, "utf-8");
    const task = JSON.parse(taskJson);

    const result = TaskSchema.safeParse(task);

    if (!result.success) {
      consola.error(`Invalid file ${taskFilePath}`);
      consola.error(result.error);
      continue;
    }

    const tags = result.data.tag;

    if (tags.includes(tagName)) {
      consola.log(taskFilePath);
    }
  }

  const noteBooks = await readdir(NOTE_DIR, "utf-8");

  for (const bookName of noteBooks) {
    const bookPath = join(NOTE_DIR, bookName);
    const noteFileNames = await readdir(bookPath, "utf-8");

    for (const noteFileName of noteFileNames) {
      const noteFilePath = join(bookPath, noteFileName);
      const content = await readFile(noteFilePath);
      const parsedMarkdown = matter(content);
      const result = MarkdownMetaSchema.safeParse(parsedMarkdown.data);

      if (!result.success) {
        consola.error(`Invalid file ${noteFilePath}`);
        consola.error(result.error);
        continue;
      }

      if (result.data.tags.includes(tagName)) {
        consola.log(noteFilePath);
      }
    }
  }
};
