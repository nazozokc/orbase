import { deleteDiary } from "../../diary/deleteDiary.ts";
import { getDiaryDir } from "../../constant/app.ts";
import { join } from "path";
import { access } from "node:fs/promises";
import consola from "consola";
import { input } from "@inquirer/prompts";

export const del = async (): Promise<void> => {
  const year = await input({
    message: "Enter a fill year (e.g. 2026)",
  });

  const month = await input({
    message: "Enter a month (e.g. 08)",
  });

  const date = await input({
    message: "Enter a date (e.g. 01)",
  });

  const filename = join(
    await getDiaryDir(),
    String(year),
    String(month).padStart(2, "0"),
    `${year}-${month}-${date}.md`,
  );

  try {
    await access(filename);
  } catch (error) {
    consola.error("No such file or directory");
    return;
  }

  await deleteDiary(filename);
};
