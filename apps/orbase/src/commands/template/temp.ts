import { TEMPLATE_DIR } from "../../constant/app.ts";
import { readdir, cp, stat } from "node:fs/promises";
import process from "node:process";
import { join, resolve, sep } from "node:path";
import consola from "consola";

export const copyTemplate = async (templateName: string): Promise<void> => {
  const destinationDirectory = process.cwd();
  const templatePath = resolve(TEMPLATE_DIR, templateName);
  const templateRoot = resolve(TEMPLATE_DIR);

  // sepはセパレーターのこと、linux,macOSは”/”,windowsは"\"
  if (
    templatePath !== templateRoot &&
    !templatePath.startsWith(`${templateRoot}${sep}`)
  ) {
  }
  // statで情報を手に入れる
  const templateStats = await stat(templatePath);

  if (templateStats.isDirectory()) {
    const templateEntries = await readdir(templatePath);
    for (const entryName of templateEntries) {
      const sourceEntryPath = join(templatePath, entryName);
      const destinationEntryPath = join(destinationDirectory, entryName);

      await cp(sourceEntryPath, destinationEntryPath, { recursive: true });
    }
  } else {
    const destinationPath = join(destinationDirectory, templateName);
    await cp(templatePath, destinationPath, { recursive: true });
  }

  consola.success("success template file");
};
