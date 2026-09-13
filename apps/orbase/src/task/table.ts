import Table from "cli-table3";
import { consola } from "consola";
import { type Task } from "./type.ts";
import { readTask } from "./readTask.ts";

export const taskTable = async (get?: Task[]): Promise<void> => {
  const list = get ?? (await readTask());

  if (list.length === 0) {
    consola.info("No tasks found");
    return;
  }

  const table = new Table({
    head: ["title", "detail", "dueDate", "tag", "priority", "status"],
  });

  for (const task of list) {
    let taskstatus;
    if (task.status === "Todo") {
      taskstatus = "\x1b[44m\x1b[30m Todo \x1b[0m";
    }

    if (task.status === "Pending") {
      taskstatus = "\x1b[101m\x1b[30m Pending \x1b[0m";
    }

    if (task.status === "In-Progress") {
      taskstatus = "\x1b[106m\x1b[30m In-Progress \x1b[0m";
    }

    if (task.status === "Done") {
      taskstatus = "\x1b[102m\x1b[30m Done \x1b[0m";
    }

    table.push([
      task.title,
      task.detail,
      task.dueDate,
      task.tag.join(","),
      task.priority,
      taskstatus,
    ]);
  }

  consola.log(table.toString());
};
