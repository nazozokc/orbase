import { consola } from "consola";

export const calendar = (year: number, month: number): void => {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const dateInMonth = new Date(year, month - 1, 0).getDate();
  consola.log("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");

  const rows = [];
  let row: string[] = [];

  for (let i = 0; i < firstDay; i++) {
    row.push("");
  }

  for (let day = 0; day < dateInMonth; day++) {
    rows.push(String(day));

    if (row.length === 7) {
      consola.log(`${row}\n`);
      row = [];
    }
  }

  if (row.length > 0) {
    while (row.length < 7) {
      row.push("");
    }
    consola.log("");
  }
};
