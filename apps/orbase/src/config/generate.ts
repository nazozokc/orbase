import consola from "consola";
import { ROOT_DIR } from "../constant/app.ts";
import type { Config } from "./type.ts";
import { mkdir, writeFile } from "node:fs/promises";

export const ConfigGenerate = async (): Promise<void> => {
  const generateTemplate: Config = {
    save_directory: "~/.orbase",
  };

  try {
    await mkdir(ROOT_DIR, { recursive: true });
    const stringify = JSON.stringify(generateTemplate, null, 2);
    await writeFile(`${ROOT_DIR}/config.json`, stringify, "utf-8");
  } catch (error) {
    consola.error(error);
    return;
  }
};
