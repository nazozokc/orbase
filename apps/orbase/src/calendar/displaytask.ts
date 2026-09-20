import { consola } from "consola";
import { readTask } from "../task/readTask.ts";
import Table from "cli-table3";

export const displayTasksForMonth = async (
  year: string,
  month: string,
): Promise<void> => {
  const tasks = await readTask();
  const table = new Table({
    head: ["title", "detail", "dueDate", "tag", "priority", "status"],
  });
  for (const task of tasks) {
    const [taskYear, taskMonth] = task.dueDate.split("-");
    if (taskYear === year && taskMonth === String(+month + 1)) {
      let statusLabel;
      if (task.status === "Todo") {
        statusLabel = "\x1b[44m\x1b[30m Todo \x1b[0m";
      }

      if (task.status === "Pending") {
        statusLabel = "\x1b[101m\x1b[30m Pending \x1b[0m";
      }

      if (task.status === "In-Progress") {
        statusLabel = "\x1b[106m\x1b[30m In-Progress \x1b[0m";
      }

      if (task.status === "Done") {
        statusLabel = "\x1b[102m\x1b[30m Done \x1b[0m";
      }

      table.push([
        task.title,
        task.detail,
        task.dueDate,
        task.tag.join(","),
        task.priority,
        task.status,
      ]);
    }
  }

  consola.log(table.toString());
};
