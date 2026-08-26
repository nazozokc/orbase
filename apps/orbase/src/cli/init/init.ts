import { INIT_DIR } from "../../constant/app.ts";
import { checkbox } from "@inquirer/prompts";
import { readdir, cp } from "node:fs/promises";
import process from "node:process";
import { join } from "node:path";

export const init = async (): Promise<void> => {
  const choices = [];
  const basedir = join(`${INIT_DIR}`, init);
  const currentDir = process.cwd();
  const readed = await readdir(basedir);

  for (const file of readed) {
    await checkbox({});
  }
};
