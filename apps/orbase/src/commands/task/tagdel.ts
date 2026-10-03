import { TaskTagRead } from "../../task/tags/TaskTagRead.ts";
import { TaskTagSave } from "../../task/tags/TaskTagSave.ts";

export const tagdel = async (tagString: string[]): Promise<void> => {
  const readtags = await TaskTagRead();

  const saves = tagString.filter((tag) => !readtags.includes(tag));

  await TaskTagSave(saves);
};
