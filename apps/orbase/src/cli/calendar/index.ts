import { define } from "gunshi";
import { calendar } from "../../calendar/index.ts";

export const calendarCommand = define({
  name: "calendar",
  description: "spread calendar",
  args: {
    year: {
      type: "positional",
      required: false,
    },
    month: {
      type: "positional",
      required: false,
    },
  },

  run(ctx) {
    const year = Number(ctx.values.year);
    const month = Number(ctx.values.month);

    calendar(year, month);
  },
});
