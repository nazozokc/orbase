import { TASK_DIR, NOTE_DIR, DIARY_DIR } from "../constant/app.ts";
import { readFile, readdir } from "node:fs/promises";
import { join } from "path";
import { consola } from "consola";

export const searchString = async (search: string): Promise<void> => {
  try {
    const taskFiles = await readdir(TASK_DIR, "utf-8");

    for (const taskFile of taskFiles) {
      const path = join(TASK_DIR, taskFile);
      const taskContent = await readFile(path, "utf-8");

      if (taskContent.includes(search)) {
        consola.log(path);
        consola.log(taskContent);
      }
    }

    const notes = await readdir(NOTE_DIR, "utf-8");

    for (const noteDir of notes) {
      const path = join(NOTE_DIR, noteDir);
      const File = await readdir(path, "utf-8");

      for (const contentRead of File) {
        const path = join(NOTE_DIR, noteDir, contentRead);
        const content = await readFile(path, "utf-8");
        if (content.includes(search)) {
          consola.log(path);
          consola.log(content);
        }
      }
    }

    const diaryYears = await readdir(DIARY_DIR, "utf-8");

    for (const year of diaryYears) {
      const diaryMonths = await readdir(join(DIARY_DIR, year));
      for (const month of diaryMonths) {
        const path = join(DIARY_DIR, year, month);
        const diaryContent = await readFile(path, "utf-8");

        if (diaryContent.includes(search)) {
          consola.log(path);
          consola.log(diaryContent);
        }
      }
    }
  } catch (error) {
    consola.error(error);
  }
};
