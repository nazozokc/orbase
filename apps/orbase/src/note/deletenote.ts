import { unlink } from "node:fs/promises";
import { join } from "node:path";
import { getNoteDir } from "../constant/app.ts";

export const deleteNote = async (
  name: string,
  books: string,
): Promise<void> => {
  await unlink(join(await getNoteDir(), books, `${name}`));
};
