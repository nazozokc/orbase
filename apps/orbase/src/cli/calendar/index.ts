import { define } from "gunshi";
import { calendar } from "../../calendar/index.ts";

export const calendarCommand = define({
  name: "calendar",
  description: "spread calendar",
  args: {
    year: {
      type: "positional",
    },
    month: {
      type: "positional",
    },
  },

  run(ctx) {
    const year = Number(ctx.values.year);
    const month = Number(ctx.values.month);

    calendar(year, month);
  },
});
