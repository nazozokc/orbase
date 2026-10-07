import consola from "consola";
import { NOTE_DIR, ROOT_DIR } from "../../constant/app";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

export const bookSave = async (filename: string): Promise<void> => {
  try {
    await mkdir(join(NOTE_DIR, filename), { recursive: true });

    let books: string[] = [];

    try {
      const json = await readFile(`${ROOT_DIR}/book.json`, "utf-8");
      books = JSON.parse(json);
    } catch (error) {
      consola.error(error);
    }

    if (!books.includes(filename)) {
      books.push(filename);
    }

    await writeFile(
      `${ROOT_DIR}/book.json`,
      JSON.stringify(books, null, 2),
      "utf-8",
    );
  } catch (error) {
    consola.error(error);
  }
};
