import { DIARY_DIR } from "../../constant/app.ts";
import { join } from "path";
import { access } from "node:fs/promises";
import consola from "consola";
import openEditor from "open-editor";
import { input } from "@inquirer/prompts";

export const edit = async (): Promise<void> => {
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
    DIARY_DIR,
    String(year),
    String(month),
    `${year}-${month}-${date}.md`,
  );

  try {
    await access(filename);
  } catch (error) {
    consola.error("No such file or directory");
    return;
  }

  await openEditor([
    {
      file: filename,
      line: 1,
      column: 1,
    },
  ]);
};
