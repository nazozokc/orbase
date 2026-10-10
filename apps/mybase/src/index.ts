#!/usr/bin/env node

import { cli, define } from "gunshi";
import { taskCommand } from "./commands/task/index.ts";
import { noteCommand } from "./commands/note/index.ts";
import { diaryCommand } from "./commands/diary/index.ts";
import { searchCommand } from "./commands/search/index.ts";
import { templateCommand } from "./commands/template/index.ts";
import { calendarCommand } from "./commands/calendar/index.ts";
import { initCommand } from "./commands/init/index.ts";
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
    template: templateCommand,
    search: searchCommand,
    calendar: calendarCommand,
    init: initCommand,
  },
});
