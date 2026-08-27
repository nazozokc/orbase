import { TEMPLATE_DIR } from "../../constant/app.ts";
import { readdir, cp, stat } from "node:fs/promises";
import process from "node:process";
import { join } from "node:path";
import consola from "consola";

export const template = async (directory: string): Promise<void> => {
  const currentDir = process.cwd();
  const dir = join(TEMPLATE_DIR, directory);
  const sourceStat = await stat(dir);

  if (sourceStat.isDirectory()) {
    const sourceFiles = await readdir(dir);
    for (const sourceFile of sourceFiles) {
      const sourceFilePath = join(dir, sourceFile);
      const destinationFilePath = join(currentDir, sourceFile);

      await cp(sourceFilePath, destinationFilePath, { recursive: true });
    }
  } else {
    const destinationPath = join(currentDir, directory);
    await cp(dir, destinationPath, { recursive: true });
  }

  consola.success("success template file");
};
