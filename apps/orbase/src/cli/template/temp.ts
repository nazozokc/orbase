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
    const sourcefiles = join(TEMPLATE_DIR, file);
    const source = await stat(sourcefiles);
    const toinit = join(currentDir, file);

    if (source.isDirectory()) {
      const dir = await readdir(sourcefiles);
      for (const sourcefile of dir) {
        const sourcedir = join(sourcefiles, sourcefile);
        const currentdirectory = join(currentDir, sourcefile);

        await cp(sourcedir, currentdirectory, { recursive: true });
      }
    } else {
      await cp(sourcefiles, toinit, { recursive: true });
    }
  }
};
