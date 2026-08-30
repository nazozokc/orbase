import { writeFile, mkdir } from "node:fs/promises";
import { NOTE_DIR } from "../constant/app.js";
import openEditor from "open-editor";
import { join } from "node:path";
import matter from "gray-matter";

export const addNote = async (
  filename: string,
  books: string,
): Promise<void> => {
  await mkdir(NOTE_DIR, { recursive: true });
  const path = join(NOTE_DIR, books, `${filename}.md`);
  const now = new Date();

  const md = matter.stringify("# 本文", {
    name: "",
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
