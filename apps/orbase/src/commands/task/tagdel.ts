import { checkbox } from "@inquirer/prompts";
import { TaskTagWrite } from "../../task/tags/TaskTagWrite.ts";
import { TaskTagRead } from "../../task/tags/TaskTagRead.ts";
import { readTask } from "../../task/readTask.ts";
import type { Task } from "../../task/type.ts";
import { join } from "node:path";
import { getTaskDir } from "../../constant/app.ts";
import { writeFile } from "node:fs/promises";

export const tagdel = async (): Promise<void> => {
  const choices = await TaskTagRead();
  const selected = await checkbox({
    message: "select delete tags",
    choices,
  });

  const saves = choices.filter((sel) => !selected.includes(sel));

  const readallTask = await readTask();
  for (const readtask of readallTask) {
    const tagdelete = readtask.tag.filter((tag) => !selected.includes(tag));
    const task: Task = {
      ...readtask,
      tag: tagdelete,
    };

    const taskDir = await getTaskDir();
    const path = join(taskDir, `${readtask.id}.json`);
    const stringify = JSON.stringify(task, null, 2);
    await writeFile(path, stringify, "utf-8");
  }

  await TaskTagWrite(saves);
};
