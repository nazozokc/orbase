import { select } from "@inquirer/prompts";
import { readTask } from "../../task/readTask.ts";
import { taskTable } from "../../task/table.ts";

export const statuschange = async (): Promise<void> => {
  const task = await readTask();

  const selected = await select({
    message: "Select priority",
    choices: [
      { name: "To Do", value: "Todo" },
      { name: "Pending", value: "Pending" },
      { name: "In Progress", value: "In-Progress" },
      { name: "Done", value: "Done" },
    ],
  });

  const filter = task.filter((task) => task.status === selected);

  await taskTable(filter);
};
