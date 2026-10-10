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
    const year =
      ctx.values.year !== undefined ? Number(ctx.values.year) : undefined;

    const month =
      ctx.values.month !== undefined ? Number(ctx.values.month) : undefined;

    calendar(year, month);
  },
});
