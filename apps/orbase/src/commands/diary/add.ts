import { addDiary } from "../../diary/addDiary.ts";

export const add = async (): Promise<void> => {
  await addDiary();
};
