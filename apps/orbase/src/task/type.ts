export type Task = {
  id: string;
  title: string;
  text: string;
  dueDate: string;
  done: boolean;
  priority: "low" | "medium" | "high" | "extra-high";
  tag: string[];
  createdAt: string;
};
