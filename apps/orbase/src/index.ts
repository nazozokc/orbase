#!/usr/bin/env node

import { cli, define } from "gunshi";
import { taskCommand } from "./cli/task/index.ts";
import { noteCommand } from "./cli/note/index.ts";
import { diaryCommand } from "./cli/diary/index.ts";
import { searchCommand } from "./cli/search/index.ts";
import { version } from "./version.ts";
import { CLI_COMMAND_NAME } from "./constant/app.ts";

const mainCommand = define({
  name: CLI_COMMAND_NAME,
  description: "A CLI for managing your life",
});

await cli(process.argv.slice(2), mainCommand, {
  name: CLI_COMMAND_NAME,
  version: await version(),
  subCommands: {
    task: taskCommand,
    note: noteCommand,
    diary: diaryCommand,
    search: searchCommand,
  },
});
