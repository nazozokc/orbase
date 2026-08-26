import { TEMPLATE_DIR } from "../../constant/app.ts";
import { checkbox } from "@inquirer/prompts";
import { readdir, cp, stat } from "node:fs/promises";
import process from "node:process";
import { join } from "node:path";

export const template = async (): Promise<void> => {
  const currentDir = process.cwd();
  const choices = await readdir(TEMPLATE_DIR);

  const selected = await checkbox({
    message: "template files",
    choices,
  });

  for (const file of selected) {
    const sourcePath = join(TEMPLATE_DIR, file);
    const sourceStats = await stat(sourcePath);
    const destinationPath = join(currentDir, file);

    if (sourceStats.isDirectory()) {
      const sourceFiles = await readdir(sourcePath);
      for (const sourceFile of sourceFiles) {
        const sourceFilePath = join(sourcePath, sourceFile);
        const destinationFilePath = join(currentDir, sourceFile);

        await cp(sourceFilePath, destinationFilePath, { recursive: true });
      }
    } else {
      await cp(sourcePath, destinationPath, { recursive: true });
    }
  }
};
