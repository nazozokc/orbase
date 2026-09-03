import { z } from "zod";

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  detail: z.string(),
  dueDate: z.string(),
  priority: z.enum(["Low", "Medium", "High", "Extra-high"]),
  tag: z.array(z.string()),
  status: z.enum(["Todo", "Pending", "In-Progress", "Done"]),
  createdAt: z.string(),
});

export type Task = z.infer<typeof TaskSchema>;
