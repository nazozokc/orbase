import { select } from "@inquirer/prompts";
import { readTask } from "../../task/readTask.ts";
import { displayTaskTable } from "../../task/table.ts";

export const filterTasksByStatus = async (): Promise<void> => {
  const tasks = await readTask();

  const selectedStatus = await select({
    message: "Select status",
    choices: [
      { name: "To Do", value: "Todo" },
      { name: "Pending", value: "Pending" },
      { name: "In Progress", value: "In-Progress" },
      { name: "Done", value: "Done" },
    ],
  });

  const filteredTasks = tasks.filter((task) => task.status === selectedStatus);

  await displayTaskTable(filteredTasks);
};
