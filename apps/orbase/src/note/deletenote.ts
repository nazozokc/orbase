import { unlink } from "node:fs/promises";
import { join } from "path";
import { getNoteDir } from "../constant/app.js";

export const deleteNote = async (
  name: string,
  books: string,
): Promise<void> => {
  await unlink(join(await getNoteDir(), books, `${name}`));
};
