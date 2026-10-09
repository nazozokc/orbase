import { getTaskDir, getNoteDir, getDiaryDir } from "../constant/app.ts";
import { readFile, readdir } from "node:fs/promises";
import { join } from "path";
import { consola } from "consola";
import { TaskSchema } from "../task/type.ts";

export const searchString = async (searchTerm: string): Promise<void> => {
  const taskDir = await getTaskDir();
  const taskFiles = await readdir(taskDir, "utf-8");

  if (taskFiles !== undefined) {
    for (const taskFileName of taskFiles) {
      if (taskFileName.endsWith(".json")) {
        const taskFilePath = join(taskDir);
        const taskContent = await readFile(taskFilePath, "utf-8");
        const parsedTask = JSON.parse(taskContent);

        const parsedTaskResult = TaskSchema.safeParse(parsedTask);

        if (!parsedTaskResult.success) {
          consola.error(`Invalid file ${taskFilePath}`);
          consola.error(parsedTaskResult.error);
          continue;
        }

        if (taskContent.includes(searchTerm)) {
          consola.log(taskFilePath);
          consola.log(taskContent);
        }
      }
    }
  }

  const noteDir = await getNoteDir();
  const noteBooks = await readdir(noteDir, "utf-8");

  if (noteBooks !== undefined) {
    for (const bookName of noteBooks) {
      const bookPath = join(noteDir, bookName);
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
  } else {
    consola.error("0 note books");
  }

  const diaryDir = await getDiaryDir();
  const diaryYears = await readdir(diaryDir, "utf-8");

  if (diaryYears !== undefined) {
    for (const year of diaryYears) {
      const diaryMonthNames = await readdir(join(diaryDir, year));
      for (const month of diaryMonthNames) {
        const diaryFilePath = join(diaryDir, year, month);
        const diaryContent = await readFile(diaryFilePath, "utf-8");

        if (diaryContent.includes(searchTerm)) {
          consola.log(diaryFilePath);
          consola.log(diaryContent);
        }
      }
    }
  }
};
