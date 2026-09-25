import Table from "cli-table3";
import { consola } from "consola";
import { displayTasksForMonth } from "./displaytask.ts";

export const calendar = async (
  year?: number,
  month?: number,
): Promise<void> => {
  try {
    const now = new Date();
    const displayYear = year ?? now.getFullYear();
    const displayMonthIndex = month !== undefined ? month - 1 : now.getMonth();
    const displayMonth = month !== undefined ? month : now.getMonth() + 1;

    const firstDayOfMonth = new Date(
      displayYear,
      displayMonthIndex,
      1,
    ).getDay();
    const daysInMonth = new Date(displayYear, displayMonth, 0).getDate();

    const table = new Table({
      head: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    });

    let row: string[] = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      row.push("");
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        displayYear === now.getFullYear() &&
        displayMonthIndex === now.getMonth() &&
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

    await displayTasksForMonth(String(displayYear), String(displayMonthIndex));
  } catch (error) {
    consola.error(error);
  }
};
