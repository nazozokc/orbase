import { unlink } from "node:fs/promises";
import { join } from "path";

export const deleteDiary = async (name: string): Promise<void> => {
  await unlink(join(name));
};
