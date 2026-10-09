import { readdir, readFile, writeFile } from "node:fs/promises";
import { getTaskDir } from "../../../constant/app.ts";
import { join } from "node:path";
import { select, input } from "@inquirer/prompts";
import { tagChangeAction } from "./edit.ts";
import consola from "consola";
import { TaskSchemaCreate } from "../../../task/type.ts";

export const edit = async (): Promise<void> => {
  try {
    const taskDir = await getTaskDir();
    const files = await readdir(taskDir);
    const choices = [];

    for (const file of files) {
      const filePath = join(taskDir, file);
      const content = await readFile(filePath, "utf-8");
      const result = TaskSchemaCreate.safeParse(JSON.parse(content));

      if (!result.success) {
        consola.error(`Invalid file ${file}`);
        continue;
      }

      choices.push({
        name: result.data.title,
        value: file,
      });
    }

    const selected = await select({
      message: "Select task to edit",
      choices,
    });

    const filePath = join(taskDir, selected);
    const taskRead = await readFile(filePath, "utf-8");
    const task = JSON.parse(taskRead);

    while (true) {
      const selects = await select({
        message: "what edit it?",
        choices: [
          { name: "title", value: "title" },
          { name: "detail", value: "detail" },
          { name: "dueDate", value: "dueDate" },
          { name: "priority", value: "priority" },
          { name: "tag", value: "tag" },
          { name: "status", value: "status" },
          { name: "done", value: "done" },
        ],
      });

      switch (selects) {
        case "title":
          task.title = await input({
            message: "change title?",
            default: task.title,
          });
          break;

        case "detail":
          task.detail = await input({
            message: "change text?",
            default: task.detail,
          });

          break;

        case "dueDate":
          task.dueDate = await input({
            message: "change dueDate?",
            default: task.dueDate,
          });

          break;

        case "priority":
          task.priority = await select({
            message: "change priority?",
            choices: [
              { name: "Low", value: "Low" },
              { name: "Medium", value: "Medium" },
              { name: "High", value: "High" },
              { name: "Extra High", value: "Extra-high" },
            ],

            default: task.priority,
          });

          break;

        case "tag":
          task.tag = await tagChangeAction(filePath);
          break;

        case "status":
          task.status = await select({
            message: "Select status",
            choices: [
              { name: "To Do", value: "Todo" },
              { name: "Pending", value: "Pending" },
              { name: "In Progress", value: "In-Progress" },
              { name: "Done", value: "Done" },
            ],

            default: task.status,
          });

          break;

        case "done":
          const taskJsonStringify = JSON.stringify(task, null, 2);

          await writeFile(filePath, taskJsonStringify, "utf-8");

          return;
      }
    }
  } catch (error) {
    consola.error(error);
  }
};
