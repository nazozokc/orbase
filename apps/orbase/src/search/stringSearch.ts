import { TASK_DIR, NOTE_DIR, DIARY_DIR } from "../constant/app.ts";
import { readFile, readdir } from "node:fs/promises";
import { join } from "path";
import { consola } from "consola";
import { TaskSchema } from "../task/type.ts";

export const searchString = async (searchTerm: string): Promise<void> => {
  try {
    const taskFiles = await readdir(TASK_DIR, "utf-8");

    for (const taskFileName of taskFiles) {
      const taskFilePath = join(TASK_DIR, taskFileName);
      const taskContent = await readFile(taskFilePath, "utf-8");
      const parsedTask = JSON.parse(taskContent);

      const parsedTaskResult = TaskSchema.safeParse(parsedTask);

      if (!parsedTaskResult.success) {
        consola.error(`Invalid file ${taskFilePath}`);
        consola.error(parsedTaskResult.error);
      }

      if (taskContent.includes(searchTerm)) {
        consola.log(taskFilePath);
        consola.log(taskContent);
      }
    }

    const noteBooks = await readdir(NOTE_DIR, "utf-8");

    for (const bookName of noteBooks) {
      const bookPath = join(NOTE_DIR, bookName);
      const noteFileNames = await readdir(bookPath, "utf-8");

      for (const noteFileName of noteFileNames) {
        const noteFilePath = join(bookPath, noteFileName);
        const content = await readFile(noteFilePath, "utf-8");
        if (content.includes(searchTerm)) {
          consola.log(noteFilePath);
          consola.log(content);
        }
      }
    }

    const diaryYears = await readdir(DIARY_DIR, "utf-8");

    for (const year of diaryYears) {
      const diaryMonthNames = await readdir(join(DIARY_DIR, year));
      for (const month of diaryMonthNames) {
        const diaryFilePath = join(DIARY_DIR, year, month);
        const diaryContent = await readFile(diaryFilePath, "utf-8");

        if (diaryContent.includes(searchTerm)) {
          consola.log(diaryFilePath);
          consola.log(diaryContent);
        }
      }
    }
  } catch (error) {
    consola.error(error);
  }
};
