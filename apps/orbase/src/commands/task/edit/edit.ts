import { input, select, checkbox } from "@inquirer/prompts";
import { TaskTagSave, type TagType } from "../../../task/tags/TaskTagSave.ts";
import { TaskTagRead } from "../../../task/tags/TaskTagRead.ts";

export const tagChangeAction = async (filePath: string): Promise<TagType> => {
  const action = await select({
    message: "create or select?",
    choices: ["create", "select"],
  });

  const tags: TagType = [];

  switch (action) {
    case "create":
      const tag = await input({
        message: "create and select tags",
      });

      const splitTags = tag.split(",").map((tag) => tag.trim());

      await TaskTagSave(splitTags);

      tags.push(...splitTags);
      break;

    case "select":
      const availableTags = await TaskTagRead();

      const selectedTags = await checkbox({
        message: "select tags",
        choices: availableTags,
        validate: (selected) => {
          if (selected.length === 0) {
            return "少なくとも一つ選択してください";
          }

          return true;
        },
      });

      tags.push(...selectedTags);
      break;
  }

  return tags;
};
