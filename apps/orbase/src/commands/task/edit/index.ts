import { readdir, readFile, writeFile } from "node:fs/promises";
import { TASK_DIR } from "../../../constant/app.ts";
import { join } from "node:path";
import { select, input } from "@inquirer/prompts";
import { tagChangeAction } from "./edit.ts";
import consola from "consola";
import { TaskSchema, type Task } from "../../../task/type.ts";

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

      let titleSelect = task.title;
      let detailSelect = task.detail;
      let dueDateSelect = task.dueDate;
      let prioritySelect = task.priority;
      let tagSelect = task.tag;
      let statusSelect = task.status;

      switch (selects) {
        case "title":
          titleSelect = await input({
            message: "change title?",
            default: task.title,
          });
          break;

        case "detail":
          detailSelect = await input({
            message: "change text?",
            default: task.detail,
          });

          break;

        case "dueDate":
          dueDateSelect = await input({
            message: "change dueDate?",
            default: task.dueDate,
          });

          break;

        case "priority":
          prioritySelect = await select({
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
          tagSelect = await tagChangeAction(filePath);
          break;

        case "status":
          statusSelect = await select({
            message: "Select priority",
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
          const tasks: Task = {
            id: task.id,
            title: titleSelect,
            detail: detailSelect,
            dueDate: dueDateSelect,
            priority: prioritySelect,
            tag: tagSelect,
            status: statusSelect,
            createdAt: task.createdAt,
          };
          const result = TaskSchema.safeParse(tasks);

          if (!result.success) {
            consola.error(result.error);
            return;
          }

          const taskJsonStringify = JSON.stringify(result.data, null, 2);

          await writeFile(filePath, taskJsonStringify, "utf-8");

          return;
      }
    }
  } catch (error) {
    consola.error(error);
  }
};
