import { writeFile, mkdir } from "node:fs/promises";
import { getDiaryDir } from "../constant/app.ts";
import openEditor from "open-editor";
import { join } from "node:path";

export const addDiary = async (): Promise<void> => {
  const now = new Date();

  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const diaryDir = join(await getDiaryDir(), year, month);
  const filename = join(diaryDir, `${year}-${month}-${day}.md`);

  await mkdir(diaryDir, { recursive: true });

  try {
    await writeFile(filename, "", { flag: "wx" });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") {
      throw error;
    }
  }

  await openEditor([
    {
      file: filename,
      line: 1,
      column: 1,
    },
  ]);
};
