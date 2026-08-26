import { TEMPLATE_DIR } from "../../constant/app.ts";
import { checkbox, input } from "@inquirer/prompts";
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
    const source = join(TEMPLATE_DIR, file);
    const toinit = join(currentDir, file);

    await cp(source, toinit, { recursive: true });
  }
};
