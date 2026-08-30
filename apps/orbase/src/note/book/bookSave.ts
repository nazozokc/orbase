import consola from "consola";
import { ROOT_DIR } from "../../constant/app";
import { mkdir, writeFile } from "node:fs/promises";

export const bookSave = async (filename: string): Promise<void> => {
  try {
    await mkdir(ROOT_DIR, { recursive: true });
    const bookJson = JSON.stringify(filename, null, 2);
    await writeFile(`${ROOT_DIR}/book.json`, bookJson, "utf-8");
  } catch (error) {
    consola.error(error);
    return;
  }
};
