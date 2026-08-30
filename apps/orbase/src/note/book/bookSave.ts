import consola from "consola";
import { ROOT_DIR } from "../../constant/app";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

export const bookSave = async (filename: string): Promise<void> => {
  try {
    const path = join(ROOT_DIR, filename);
    await mkdir(path, { recursive: true });
    const bookJson = JSON.stringify(filename, null, 2);
    await writeFile(`${ROOT_DIR}/book.json`, bookJson, "utf-8");
  } catch (error) {
    consola.error(error);
    return;
  }
};
