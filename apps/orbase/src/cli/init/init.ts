import { select } from "@inquirer/prompts";
import { INIT_DIR } from "../../constant/app.ts";
import { readFile, readdir, writeFile } from "node:fs/promises";
import process from "node:process";
import { join } from "node:path";

export const init = async (): Promise<void> => {
  const readDir = await readdir(INIT_DIR);
  const choices = [];

  for (const copyfile of readDir) {
    const currentDir = process.cwd();
    const dir = join();
    await writeFile(``);
  }

  for (const copydir of readDir) {
  }
};
