export type Task = {
  id: string;
  title: string;
  text: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High" | "Extra-high";
  tag: string[];
  status: "Todo" | "Pending" | "In-Progress" | "Done";
  createdAt: string;
};
