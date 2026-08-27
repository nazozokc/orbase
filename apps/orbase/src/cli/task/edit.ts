import { readdir, readFile } from "node:fs/promises";
import { TASK_DIR } from "../../constant/app.ts";
import { join } from "node:path";
import { select } from "@inquirer/prompts";
import openEditor from "open-editor";
import consola from "consola";

export const edit = async (): Promise<void> => {
  try {
    const files = await readdir(TASK_DIR);
    const choices = [];

    for (const file of files) {
      const filePath = join(TASK_DIR, file);
      const content = await readFile(filePath, "utf-8");
      const task = JSON.parse(content);

      choices.push({
        name: task.name,
        value: file,
      });
    }

    const selected = await select({
      message: "Select task to edit",
      choices,
    });

    const filePath = join(TASK_DIR, selected);

    openEditor([
      {
        file: filePath,
        line: 1,
        column: 1,
      },
    ]);
  } catch (error) {
    consola.error(error);
  }
};
