import { select } from "@inquirer/prompts";
import { readTask } from "../../task/readTask.ts";
import { taskTable } from "../../task/table.ts";

export const statuschange = async (): Promise<void> => {
  const task = await readTask();

  const selected = await select({
    message: "Select priority",
    choices: [
      { name: "To Do", value: "todo" },
      { name: "Pending", value: "pending" },
      { name: "In Progress", value: "inprogress" },
      { name: "Done", value: "done" },
    ],
  });

  const filter = task.filter((task) => task.status === selected);

  await taskTable(filter);
};
