import { input, select, checkbox } from "@inquirer/prompts";
import { writeTask } from "../../task/writeTask.ts";
import { tagSave, type TagType } from "../../tags/tagSave.ts";
import { randomUUID } from "crypto";
import { tagRead } from "../../tags/tagRead.ts";

const tagAction = async (): Promise<TagType> => {
  const action = await select({
    message: "create or select?",
    choices: ["create", "select"],
  });

  const tags: TagType = [];

  if (action === "create") {
    const tag = await input({
      message: "create and select tags",
    });

    const tagsplit = tag.split(",").map((tag) => tag.trim());

    await tagSave(tagsplit);

    tags.push(...tagsplit);
  }

  if (action === "select") {
    const read = await tagRead();

    const selectcli = await checkbox({
      message: "select tags",
      choices: read,
    });

    tags.push(...selectcli);
  }

  return tags;
};

export const add = async (): Promise<void> => {
  const title = await input({
    message: "task title",
  });

  const text = await input({
    message: "task text",
  });

  const dueDate = await input({
    message: "goal date",
  });

  const priority = await select({
    message: "Select priority",
    choices: [
      { name: "Low", value: "low" },
      { name: "Medium", value: "medium" },
      { name: "High", value: "high" },
      { name: "Extra High", value: "extra-high" },
    ],
  });
  const tag = await tagAction();

  const task = {
    id: randomUUID(),
    title,
    text,
    dueDate,
    done: false,
    priority,
    tag,
    createdAt: new Date().toISOString(),
  };

  await writeTask(task);
};
