import { unlink } from "node:fs/promises";
import { join } from "path";
import { NOTE_DIR } from "../constant/app.js";

export const deleteNote = async (name: string): Promise<void> => {
  await unlink(join(NOTE_DIR, `${name}`));
};
