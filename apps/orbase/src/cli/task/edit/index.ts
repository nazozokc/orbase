import { readdir, readFile, writeFile } from "node:fs/promises";
import { TASK_DIR } from "../../../constant/app.ts";
import { join } from "node:path";
import { select, input } from "@inquirer/prompts";
import { tagChangeAction } from "./edit.ts";
import consola from "consola";
import type { Task } from "../../../task/type.ts";

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

    const title = await input({
      message: "change title?",
      default: task.title,
    });

    const detail = await input({
      message: "change text?",
      default: task.detail,
    });

    const dueDate = await input({
      message: "change dueDate?",
      default: task.dueDate,
    });

    const priority = await select({
      message: "change priority?",
      choices: [
        { name: "Low", value: "Low" },
        { name: "Medium", value: "Medium" },
        { name: "High", value: "High" },
        { name: "Extra High", value: "Extra-high" },
      ],

      default: task.priority,
    });

    const tag = await tagChangeAction(filePath);

    const status = await select({
      message: "Select priority",
      choices: [
        { name: "To Do", value: "Todo" },
        { name: "Pending", value: "Pending" },
        { name: "In Progress", value: "In-Progress" },
        { name: "Done", value: "Done" },
      ],

      default: task.status,
    });

    const tasks: Task = {
      id: task.id,
      title,
      detail,
      dueDate,
      priority,
      tag,
      status,
      createdAt: task.createdAt,
    };

    const taskJsonStringify = JSON.stringify(tasks, null, 2);

    await writeFile(filePath, taskJsonStringify, "utf-8");
  } catch (error) {
    consola.error(error);
  }
};
