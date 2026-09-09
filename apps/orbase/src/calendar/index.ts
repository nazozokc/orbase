import { consola } from "consola";
import Table from "cli-table3";

export const calendar = (year: number, month: number): void => {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const dateInMonth = new Date(year, month - 1, 0).getDate();

  const table = new Table({
    head: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fry", "Sat"],
  });

  const rows = [];
  let row: string[] = [];

  for (let i = 0; i < firstDay; i++) {
    row.push("");
  }

  for (let day = 0; day < dateInMonth; day++) {
    row.push(String(day));

    if (row.length === 7) {
      rows.push(row);
      table.push(rows);
      row = [];
    }
  }

  if (row.length > 0) {
    while (row.length < 7) {
      row.push("");
    }
    rows.push(row);
    table.push(rows);
  }
};
