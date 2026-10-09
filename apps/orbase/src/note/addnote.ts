import { writeFile, mkdir } from "node:fs/promises";
import { getNoteDir } from "../constant/app.ts";
import openEditor from "open-editor";
import { join } from "node:path";
import matter from "gray-matter";

export const addNote = async (
  filename: string,
  books: string,
): Promise<void> => {
  const noteDir = await getNoteDir();
  await mkdir(noteDir, { recursive: true });
  const path = join(noteDir, books, `${filename}.md`);
  const now = new Date();

  const md = matter.stringify("# 本文", {
    date: `"${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}"`,
    tags: [],
  });

  try {
    await writeFile(path, md, { flag: "wx" });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") {
      throw error;
    }
  }

  await openEditor([
    {
      file: path,
      line: 1,
      column: 1,
    },
  ]);
};
