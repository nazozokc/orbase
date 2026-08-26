import { select } from "@inquirer/prompts";
import { INIT_DIR } from "../../constant/app.ts";
import { readFile } from "node:fs/promises";

export const init = async (): Promise<void> => {
  const readfiles = await readFile(INIT_DIR);
};
