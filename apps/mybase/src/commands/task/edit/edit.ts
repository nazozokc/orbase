import { input, select, checkbox } from "@inquirer/prompts";
import { TaskTagSave, type TagType } from "../../../task/tags/TaskTagSave.ts";
import { TaskTagRead } from "../../../task/tags/TaskTagRead.ts";
import { readFile } from "node:fs/promises";
import type { Task } from "../../../task/type.ts";

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
      const choices = [];
      for (const tag of availableTags) {
        const readfile = await readFile(filePath, "utf-8");
        const parsed: Task = JSON.parse(readfile);
        for (const tagFor of parsed.tag) {
          if (tag === tagFor) {
            choices.push({
              tag,
              checked: true,
            });
          } else {
            choices.push(tag);
          }
        }
      }

      const selected = await checkbox({
        message: "select tags",
        choices,
        validate: (selected) => {
          if (selected.length === 0) {
            return "少なくとも一つ選択してください";
          }

          return true;
        },
      });

      const selectedTags = selected.map((choice) => {
        if (typeof choice === "string") {
          return choice;
        }

        // checked以外のプロパティを取り出す
        const { checked, ...rest } = choice;
        return rest.tag;
      });

      tags.push(...selectedTags);
      break;
  }

  return tags;
};
