import Table from "cli-table3";
import { consola } from "consola";

export const calendar = (year: number, month: number): void => {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const dateInMonth = new Date(year, month - 1, 1).getDate();

  const table = new Table({
    head: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fry", "Sat"],
  });

  let row: string[] = [];

  for (let i = 0; i < firstDay; i++) {
    row.push("");
  }

  for (let day = 0; day < dateInMonth; day++) {
    row.push(String(day));

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
};
