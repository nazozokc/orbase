import type { Command } from "gunshi";
import { searchString } from "../../search/stringSearch.ts";
import { searchTags } from "../../search/tagsSearch.ts";

export const searchCommand: Command = {
  name: "search",
  description: "search",

  subCommands: {
    string: {
      name: "string",
      args: {
        search: {
          type: "positional",
          description: "search",
        },
      },

      async run(ctx) {
        const search = ctx.values.search;

        await searchString(search);
      },
    },

    tags: {
      name: "tags",
      args: {
        search: {
          type: "positional",
          description: "search",
        },
      },

      async run(ctx) {
        const search = ctx.values.search;

        await searchTags(search);
      },
    },
  },
};
