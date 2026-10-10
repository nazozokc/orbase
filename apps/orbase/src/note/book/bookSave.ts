import consola from "consola";
import { getNoteDir, getRootDir } from "../../constant/app.ts";
import { mkdir, rename, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

export const bookSave = async (filename: string): Promise<void> => {
  try {
    const noteDir = await getNoteDir();
    const rootDir = await getRootDir();
    await mkdir(join(noteDir, filename), { recursive: true });

    let books: string[] = [];

    try {
      const json = await readFile(`${rootDir}/book.json`, "utf-8");
      books = JSON.parse(json);
    } catch (error) {
      consola.error(error);
      return;
    }

    if (!books.includes(filename)) {
      books.push(filename);
    }
    const tmpPath = join(rootDir, "book.json.tmp");
    const FilePath = join(rootDir, "book.json");
    await writeFile(tmpPath, JSON.stringify(books, null, 2), "utf-8");
    await rename(tmpPath, FilePath);
  } catch (error) {
    consola.error(error);
  }
};
