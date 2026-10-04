import { NoteTagRead } from "../../note/tags/NoteTagRead.ts";
import { checkbox } from "@inquirer/prompts";
import { NoteTagWrite } from "../../note/tags/NoteTagWrite.ts";

export const tagdel = async (): Promise<void> => {
  const choices = await NoteTagRead();
  const selected = await checkbox({
    message: "select delete tags",
    choices,
  });

  const saves = choices.filter((sel) => !selected.includes(sel));

  await NoteTagWrite(saves);
};
