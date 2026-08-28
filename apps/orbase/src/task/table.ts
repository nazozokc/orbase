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
    head: ["title", "text", "dueDate", "tag", "priority", "status"],
  });

  for (const task of list) {
    table.push([
      task.title,
      task.text,
      task.dueDate,
      task.tag,
      task.priority,
      task.status,
    ]);
  }

  consola.log(table.toString());
};
