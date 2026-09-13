import { checkbox } from "@inquirer/prompts";
import consola from "consola";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { TASK_DIR } from "../../constant/app.ts";
import { deleteTask } from "../../task/deleteTask.ts";
import { z } from "zod";
import { TaskSchema } from "../../task/type.ts";

export const del = async (): Promise<void> => {
  try {
    const taskFiles = await readdir(TASK_DIR);
    const choices = [];

    for (const file of taskFiles) {
      const filePath = join(TASK_DIR, file);
      const content = await readFile(filePath, "utf-8");
      const read = TaskSchema.safeParse(JSON.parse(content));

      if (!read.success) {
        consola.error(`Invalid task: ${filePath}`);
        consola.error(read.error);
        continue;
      }

      const task = read.data;

      choices.push({
        name: task.title,
        value: file,
      });
    }

    const selected = await checkbox({
      message: "Select task to delete",
      choices,
    });

    for (const select of selected) {
      const filePath = join(TASK_DIR, select);

      await deleteTask(filePath);

      consola.success(`${filePath}, delete success!`);
    }
  } catch (error) {
    consola.error(error);
  }
};
