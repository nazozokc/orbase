import { INIT_DIR } from "../../constant/app.ts";
import { checkbox } from "@inquirer/prompts";
import { readdir, cp } from "node:fs/promises";
import process from "node:process";
import { join } from "node:path";

export const init = async (): Promise<void> => {
  const choices = [];
  const currentDir = process.cwd();
  const readed = await readdir(INIT_DIR);

  for (const file of readed) {
    choices.push(file);
  }

  const selected = await checkbox({
    message: "init files",
    choices,
  });

  for (const select of selected) {
    const read = join(`${INIT_DIR}`, select);
    const files = await readdir(read);
    for (const file of files) {
      const source = join(read, file);
      const toinit = join(currentDir, file);
      await cp(source, toinit, { recursive: true });
    }
  }
};
