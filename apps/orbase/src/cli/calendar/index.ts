import { define } from "gunshi";
import { calendar } from "../../calendar/index.ts";

export const calendarCommand = define({
  name: "calendar",
  description: "spread calendar",
  args: {
    year: {
      type: "positional",
      required: true,
    },
    month: {
      type: "positional",
      required: true,
    },
  },

  async run(ctx) {
    const year = ctx.values.year;
    const month = ctx.values.month;

    await calendar(year, month);
  },
});
