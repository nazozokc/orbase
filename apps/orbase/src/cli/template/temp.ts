import { TEMPLATE_DIR } from "../../constant/app.ts";
import { checkbox } from "@inquirer/prompts";
import { readdir, cp, stat } from "node:fs/promises";
import process from "node:process";
import { join } from "node:path";

export const template = async (): Promise<void> => {
  const choices = [];
  const currentDir = process.cwd();
  const readed = await readdir(TEMPLATE_DIR);

  for (const file of readed) {
    choices.push(file);
  }

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
        await cp(sourcefile, toinit, { recursive: true });
      }
    } else {
      await cp(sourcefiles, toinit, { recursive: true });
    }
  }
};
