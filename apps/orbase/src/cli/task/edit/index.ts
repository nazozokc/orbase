import { readdir, readFile, writeFile } from "node:fs/promises";
import { TASK_DIR } from "../../../constant/app.ts";
import { join } from "node:path";
import { select, input } from "@inquirer/prompts";
import { tagChangeAction } from "./edit.ts";
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
        name: task.title,
        value: file,
      });
    }

    const selected = await select({
      message: "Select task to edit",
      choices,
    });

    const filePath = join(TASK_DIR, selected);
    const taskRead = await readFile(filePath, "utf-8");
    const task = JSON.parse(taskRead);
    const tasks = [];

    const title = await input({
      message: "change title?",
      default: task.title,
    });

    const text = await input({
      message: "change text?",
      default: task.text,
    });

    const dueDate = await input({
      message: "change dueDate?",
      default: task.dueDate,
    });

    const priority = await select({
      message: "change priority?",
      choices: [
        { name: "Low", value: "low" },
        { name: "Medium", value: "medium" },
        { name: "High", value: "high" },
        { name: "Extra High", value: "extra-high" },
      ],

      default: task.priority,
    });

    const tag = await tagChangeAction(filePath);

    const status = await select({
      message: "Select priority",
      choices: [
        { name: "To Do", value: "todo" },
        { name: "Pending", value: "pending" },
        { name: "In Progress", value: "inprogress" },
        { name: "Done", value: "done" },
      ],

      default: task.status,
    });

    tasks.push({
      id: task.id,
      title,
      text,
      dueDate,
      priority,
      tag,
      status,
      createAt: task.createAt,
    });

    await writeFile(filePath, tasks, "utf-8");
  } catch (error) {
    consola.error(error);
  }
};
