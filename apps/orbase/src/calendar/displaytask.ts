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
    if (splitday[0] === year && splitday[1] === String(+month + 1)) {
      let taskstatus;
      if (forofreadtask.status === "Todo") {
        taskstatus = "\x1b[44m\x1b[30m Todo \x1b[0m";
      }

      if (forofreadtask.status === "Pending") {
        taskstatus = "\x1b[101m\x1b[30m Pending \x1b[0m";
      }

      if (forofreadtask.status === "In-Progress") {
        taskstatus = "\x1b[106m\x1b[30m In-Progress \x1b[0m";
      }

      if (forofreadtask.status === "Done") {
        taskstatus = "\x1b[102m\x1b[30m Done \x1b[0m";
      }

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
