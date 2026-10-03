import { NoteTagSave } from "../../note/tags/NoteTagSave.ts";
import { NoteTagRead } from "../../note/tags/NoteTagRead.ts";

export const tagdel = async (tagString: string[]): Promise<void> => {
  const readtags = await NoteTagRead();

  const saves = tagString.filter((tag) => readtags.includes(tag));

  await NoteTagSave(saves);
};
