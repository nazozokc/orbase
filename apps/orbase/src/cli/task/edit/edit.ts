import { input, select, checkbox } from "@inquirer/prompts";
import { tagSave, type TagType } from "../../../tags/tagSave.ts";
import { readFile } from "node:fs/promises";
import { tagRead } from "../../../tags/tagRead.ts";

export const tagChangeAction = async (filePath: string): Promise<TagType> => {
  const reads = await readFile(filePath, "utf-8");
  const task = JSON.parse(reads);

  const action = await select({
    message: "create or select?",
    choices: ["create", "select"],
  });

  const tags: TagType = [];

  if (action === "create") {
    const tag = await input({
      message: "create and select tags",
    });

    const splitTags = tag.split(",").map((tag) => tag.trim());

    await tagSave(splitTags);

    tags.push(...splitTags);
  }

  if (action === "select") {
    const availableTags = await tagRead();

    const selectedTags = await checkbox({
      message: "select tags",
      choices: availableTags,
      default: task.tag,
    });

    tags.push(...selectedTags);
  }

  return tags;
};
