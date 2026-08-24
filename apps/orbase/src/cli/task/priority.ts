import { select } from "@inquirer/prompts";
import { readTask } from "../../task/readTask.ts";
import { taskTable } from "../../task/table.ts";

export const priority = async (): Promise<void> => {
  const task = await readTask();

  const selected = await select({
    message: "Select priority",
    choices: [
      { name: "Low", value: "low" },
      { name: "Medium", value: "medium" },
      { name: "High", value: "high" },
      { name: "Extra High", value: "extra-high" },
    ],
  });

  const filter = task.filter((task) => task.priority === selected);

  await taskTable(filter);
};
