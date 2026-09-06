import { writeFile, mkdir } from "node:fs/promises";
import { z } from "zod";
import { TaskSchema, type Task } from "./type.ts";
import { TASK_DIR } from "../constant/app.ts";
import consola from "consola";

export const writeTask = async (task: Task): Promise<void> => {
  try {
    const result = TaskSchema.safeParse(task);

    if (!result.success) {
      consola.error(result.error);
      return;
    }

    await mkdir(TASK_DIR, { recursive: true });
    const taskJson = JSON.stringify(task, null, 2);
    await writeFile(`${TASK_DIR}/${task.id}.json`, taskJson, "utf-8");
  } catch (error) {
    consola.error(error);
    return;
  }
};
