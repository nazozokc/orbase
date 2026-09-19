import { select } from "@inquirer/prompts";
import { readTask } from "../../task/readTask.ts";
import { taskTable } from "../../task/table.ts";

export const priority = async (): Promise<void> => {
  const task = await readTask();

  const selected = await select({
    message: "Select priority",
    choices: [
      { name: "Low", value: "Low" },
      { name: "Medium", value: "Medium" },
      { name: "High", value: "High" },
      { name: "Extra High", value: "Extra-high" },
    ],
  });

  const filter = task.filter((task) => task.priority === selected);

  await taskTable(filter);
};
