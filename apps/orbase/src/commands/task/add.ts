import { input, select, checkbox } from "@inquirer/prompts";
import { writeTask } from "../../task/writeTask.ts";
import { TaskTagSave, type TagType } from "../../task/tags/TaskTagSave.ts";
import { TaskTagRead } from "../../task/tags/TaskTagRead.ts";
import type { Task, TaskCreate } from "../../task/type.ts";
import { consola } from "consola";

const controller = new AbortController();

process.on("SIGINT", () => {
  controller.abort();
  process.exitCode = 130;
});

export const tagAction = async (tagArg?: TagType): Promise<TagType> => {
  if (tagArg !== undefined) {
    await TaskTagSave(tagArg);
    return tagArg;
  } else {
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

      await TaskTagSave(splitTags);

      tags.push(...splitTags);
    }

    if (action === "select") {
      const availableTags = await TaskTagRead();

      const selectedTags = await checkbox({
        message: "select tags",
        choices: availableTags,
      });

      tags.push(...selectedTags);
    }

    return tags;
  }
};

export const add = async (
  titleArg?: string,
  detailArg?: string,
  dueDateArg?: string,
  priorityArg?: Task["priority"],
  tagArg?: TagType,
  statusArg?: Task["status"],
): Promise<void> => {
  try {
    const title =
      titleArg ??
      (await input({
        message: "task title",
      }));

    const detail =
      detailArg?.padStart(2, "0") ??
      (await input({
        message: "task detail",
      }));

    const now = new Date();
    const getDate = String(now.getDate()).padStart(2, "0");

    const dueDate =
      dueDateArg ??
      (await input({
        message: "goal date",
        default: `${now.getFullYear()}-${now.getMonth() + 1}-${getDate}`,
      }));

    const priority =
      priorityArg ??
      (await select({
        message: "Select priority",
        choices: [
          { name: "Low", value: "Low" },
          { name: "Medium", value: "Medium" },
          { name: "High", value: "High" },
          { name: "Extra High", value: "Extra-high" },
        ],
      }));

    const tag = await tagAction(tagArg);

    const status =
      statusArg ??
      (await select({
        message: "Select status",
        choices: [
          { name: "To Do", value: "Todo" },
          { name: "Pending", value: "Pending" },
          { name: "In Progress", value: "In-Progress" },
          { name: "Done", value: "Done" },
        ],
      }));

    const task: TaskCreate = {
      title,
      detail,
      dueDate,
      priority,
      tag,
      status,
    };

    await writeTask(task);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      consola.info("キャンセルした");
    } else {
      throw error;
    }
  }
};
