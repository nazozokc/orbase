import { NoteTagRead } from "../../note/book/NoteTagRead.ts";
import { checkbox } from "@inquirer/prompts";
import { NoteTagWrite } from "../../note/book/NoteTagWrite.ts";

export const bookdel = async (): Promise<void> => {
  const choices = await NoteTagRead();
  const selected = await checkbox({
    message: "select delete tags",
    choices,
  });

  const saves = choices.filter((sel) => !selected.includes(sel));

  await NoteTagWrite(saves);
};
