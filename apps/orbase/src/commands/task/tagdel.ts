import { checkbox } from "@inquirer/prompts";
import { TaskTagWrite } from "../../task/tags/TaskTagWrite.ts";
import { TaskTagRead } from "../../task/tags/TaskTagRead.ts";

export const tagdel = async (): Promise<void> => {
  const choices = await TaskTagRead();
  const selected = await checkbox({
    message: "select delete tags",
    choices,
  });

  const saves = choices.filter((sel) => !selected.includes(sel));

  await TaskTagWrite(saves);
};
