import { TaskSchema, type Task } from "./type.ts";
import { getTaskDir } from "../constant/app.ts";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import consola from "consola";

export const readTask = async (): Promise<Task[]> => {
  const taskDir = await getTaskDir();
  const files = await readdir(taskDir);
  const tasks = [];

  for (const file of files) {
    if (!file.endsWith(".json")) continue;

    const taskJson = await readFile(join(taskDir, file), "utf-8");

    const result = TaskSchema.safeParse(JSON.parse(taskJson));

    if (!result.success) {
      consola.error(`Invalid task: ${file}`);
      consola.error(result.error);
      continue;
    }

    tasks.push(result.data);
  }

  try {
    return tasks;
  } catch (error) {
    consola.error("Unexpected error");
    throw error;
  }
};
