import { type Task } from "./type.ts";
import { TASK_DIR } from "../constant/app.ts";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

export const readTask = async (): Promise<Task[]> => {
  try {
    const taskDir = TASK_DIR;
    const files = await readdir(taskDir);
    const tasks = [];

    for (const file of files) {
      if (!file.endsWith(".json")) continue;

      const taskJson = await readFile(join(taskDir, file), "utf-8");
      const task = JSON.parse(taskJson);

      tasks.push(task);
    }

    return tasks;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }
};
