import { getTaskDir, getNoteDir } from "../constant/app.ts";
import { MarkdownMetaSchema, type MarkdownMeta } from "../note/type.ts";
import { readFile, readdir } from "node:fs/promises";
import { join } from "path";
import { consola } from "consola";
import matter from "gray-matter";
import { TaskSchema } from "../task/type.ts";

export const searchTags = async (tagName: string): Promise<void> => {
  const taskDir = await getTaskDir();
  const taskFiles = await readdir(taskDir, "utf-8");

  for (const taskFile of taskFiles) {
    const taskFilePath = join(taskDir, taskFile);
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

  const noteDir = await getNoteDir();
  const noteBooks = await readdir(noteDir, "utf-8");

  for (const bookName of noteBooks) {
    const bookPath = join(noteDir, bookName);
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
