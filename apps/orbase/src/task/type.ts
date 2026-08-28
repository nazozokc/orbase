export type Task = {
  id: string;
  title: string;
  text: string;
  dueDate: string;
  priority: "low" | "medium" | "high" | "extra-high";
  tag: string;
  status: "todo" | "pending" | "inprogress" | "done";
  createdAt: string;
};
