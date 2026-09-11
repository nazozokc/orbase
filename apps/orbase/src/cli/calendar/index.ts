import { define } from "gunshi";
import { calendar } from "../../calendar/index.ts";

export const calendarCommand = define({
  name: "calendar",
  description: "spread calendar",
  args: {
    year: {
      type: "number",
    },
    month: {
      type: "number",
    },
  },

  run(ctx) {
    const year = ctx.values.year;
    const month = ctx.values.month;

    calendar(year, month);
  },
});
