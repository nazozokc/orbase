import Table from "cli-table3";
import { consola } from "consola";

export const calendar = (year?: number, month?: number): void => {
  try {
    const now = new Date();
    const years = year ?? now.getFullYear();
    const months = month !== undefined ? month - 1 : now.getMonth();
    const monthDateInMonth = month !== undefined ? month : now.getMonth() + 1;

    const firstDay = new Date(years, months, 1).getDay();
    const dateInMonth = new Date(years, monthDateInMonth, 0).getDate();

    const table = new Table({
      head: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    });

    let row: string[] = [];

    for (let i = 0; i < firstDay; i++) {
      row.push("");
    }

    for (let day = 1; day <= dateInMonth; day++) {
      const isToday =
        years === now.getFullYear() &&
        months === now.getMonth() &&
        day === now.getDate();

      if (isToday) {
        row.push(`[${String(day)}]`);
      } else {
        row.push(String(day));
      }

      if (row.length === 7) {
        table.push(row);
        row = [];
      }
    }

    if (row.length > 0) {
      while (row.length < 7) {
        row.push("");
      }
      table.push(row);
    }

    consola.log(table.toString());
  } catch (error) {
    consola.error(error);
  }
};
