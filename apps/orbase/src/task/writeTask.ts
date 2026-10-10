import { writeFile, mkdir, rename } from "node:fs/promises";
import { TaskSchema, TaskSchemaCreate, type TaskCreate } from "./type.ts";
import { getTaskDir } from "../constant/app.ts";
import { randomUUID } from "crypto";
import { join } from "node:path";
import consola from "consola";

export const writeTask = async (task: TaskCreate): Promise<void> => {
  const taskDir = await getTaskDir();
  const resultCreateSchema = TaskSchemaCreate.safeParse(task);

  if (!resultCreateSchema.success) {
    consola.error(resultCreateSchema.error);
    return;
  }

  const taskDoneCreateSchema = {
    id: randomUUID(),
    ...resultCreateSchema.data,
    createdAt: new Date().toISOString(),
  };

  const resultDoneSchema = TaskSchema.safeParse(taskDoneCreateSchema);

  if (!resultDoneSchema.success) {
    consola.error(resultDoneSchema.error);
    return;
  }

  try {
    await mkdir(taskDir, { recursive: true });
    const taskJson = JSON.stringify(resultDoneSchema.data, null, 2);
    const tmpPath = join(taskDir, `{resultDoneSchema.data.id}.json.tmp`);
    const filePath = join(taskDir, `{resultDoneSchema.data.id}.json`);
    await writeFile(tmpPath, taskJson, "utf-8");
    await rename(tmpPath, filePath);
  } catch (error) {
    consola.error(error);
    return;
  }
};
