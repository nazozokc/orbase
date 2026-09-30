import { checkbox } from "@inquirer/prompts";
import consola from "consola";
import { join } from "node:path";
import { TASK_DIR } from "../../constant/app.ts";
import { deleteTask } from "../../task/deleteTask.ts";
import { readTask } from "../../task/readTask.ts";

export const del = async (): Promise<void> => {
  try {
    const taskFiles = await readTask();
    const choices = [];

    for (const data of taskFiles) {
      choices.push({
        name: data.title,
        value: data.id,
      });
    }

    const selected = await checkbox({
      message: "Select task to delete",
      choices,
    });

    for (const select of selected) {
      try {
        const filePath = join(TASK_DIR, select);

        await deleteTask(`${filePath}.json`);

        consola.success(`${filePath}, delete success!`);
      } catch (error) {
        consola.error(error);
        continue;
      }
    }
  } catch (error) {
    consola.error(error);
  }
};
