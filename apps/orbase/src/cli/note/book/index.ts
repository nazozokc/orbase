import { readdir, mkdir } from "node:fs/promises";
import { select } from "@inquirer/prompts";
import { NOTE_DIR } from "../../../constant/app.ts";

export const book = async (): Promise<void> => {
  const which = await select({
    message: "create or select book?",
    choices: [
      { name: "create", value: "create" },
      { name: "select", value: "select" },
    ],
  });

  if (which === "create") {
    await mkdir(NOTE_DIR, which);
  }

  if (which === "select") {
    const choices = [];

    const read = await readdir(NOTE_DIR);

    for (const Path of read) {
      choices.push(...Path);
    }

    const selected = await select({
      message: "select books",
      choices,
    });
  }
};
