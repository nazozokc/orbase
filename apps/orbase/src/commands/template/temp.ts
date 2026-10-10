import { getTemplateDir } from "../../constant/app.ts";
import { readdir, cp, stat } from "node:fs/promises";
import process from "node:process";
import { join, resolve, sep } from "node:path";
import consola from "consola";
import { select } from "@inquirer/prompts";

export const copyTemplate = async (templateName: string): Promise<void> => {
  const tempDir = await getTemplateDir();
  const destinationDirectory = process.cwd();
  const templatePath = resolve(tempDir, templateName);
  const templateRoot = resolve(tempDir);

  // sepはセパレーターのこと、linux,macOSは”/”,windowsは"\"
  if (!templatePath.startsWith(`${templateRoot}${sep}`)) {
    consola.error("Detecting a path outside the allowed directory");
    return;
  }
  // statで情報を手に入れる
  const templateStats = await stat(templatePath);
  const read = await readdir(destinationDirectory);

  if (templateStats.isDirectory()) {
    const templateEntries = await readdir(templatePath);
    for (const entryName of templateEntries) {
      const sourceEntryPath = join(templatePath, entryName);
      const destinationEntryPath = join(destinationDirectory, entryName);

      const allow = await select({
        message: "copy template file?",
        choices: [
          { name: "yes", value: "yes" },
          { name: "no", value: "no" },
        ],
      });

      if (allow === "yes" && !read.includes(entryName)) {
        await cp(sourceEntryPath, destinationEntryPath, {
          recursive: true,
          force: false,
        });
        consola.success("success template directory");
      } else {
        consola.error("stop copy template file");
      }
    }
  } else {
    const destinationPath = join(destinationDirectory, templateName);
    const allow = await select({
      message: "copy template file?",
      choices: [
        { name: "yes", value: "yes" },
        { name: "no", value: "no" },
      ],
    });

    if (allow === "yes" && !read.includes(templateName)) {
      await cp(templatePath, destinationPath, {
        recursive: true,
        force: false,
      });
      consola.success("success template file");
    } else {
      consola.error("stop copy template file");
    }
  }
};
