import { tagRead } from "../../tags/tagRead.ts";
import { tagSave } from "../../tags/tagSave";

export const tagdel = async (tagString: string[]): Promise<void> => {
  const readtags = await tagRead();

  const saves = tagString.filter((tag) => readtags.includes(tag));

  await tagSave(saves);
};
