import { consola } from "consola";
import { readTask } from "../task/readTask.ts";
import Table from "cli-table3";

export const displaytask = async (
  year: string,
  month: string,
): Promise<void> => {
  const readtask = await readTask();
  const table = new Table({
    head: ["title", "detail", "dueDate", "tag", "priority", "status"],
  });
  for (const forofreadtask of readtask) {
    const splitday = forofreadtask.dueDate.split("-");
    if (splitday[0] === year && splitday[1] === month + 1) {
      table.push([
        forofreadtask.title,
        forofreadtask.detail,
        forofreadtask.dueDate,
        forofreadtask.tag.join(","),
        forofreadtask.priority,
        forofreadtask.status,
      ]);
    }
  }

  consola.log(table.toString());
};
