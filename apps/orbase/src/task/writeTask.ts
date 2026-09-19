import { writeFile, mkdir } from "node:fs/promises";
import { TaskSchema, TaskSchemaCreate, type TaskCreate } from "./type.ts";
import { TASK_DIR } from "../constant/app.ts";
import { randomUUID } from "crypto";
import consola from "consola";

export const writeTask = async (task: TaskCreate): Promise<void> => {
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
    await mkdir(TASK_DIR, { recursive: true });
    const taskJson = JSON.stringify(resultDoneSchema.data, null, 2);
    await writeFile(
      `${TASK_DIR}/${resultDoneSchema.data.id}.json`,
      taskJson,
      "utf-8",
    );
  } catch (error) {
    consola.error(error);
    return;
  }
};
