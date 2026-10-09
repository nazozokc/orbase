import { unlink } from "node:fs/promises";
import { join } from "node:path";

export const deleteTask = async (id: string): Promise<void> => {
  await unlink(join(`${id}.json`));
};
