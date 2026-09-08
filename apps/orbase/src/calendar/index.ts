import { consola } from "consola";

export const calendar = (year: number, month: number) => {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const dateInMonth = new Date(year, month - 1, 0).getDate();

  const rows = [];
  let row: string[] = [];

  for (let i = 1; i < firstDay; i++) {
    row.push("");
  }

  for (let day = 1; day <= dateInMonth; day++) {
    row.push(String(day));

    if (row.length === 7) {
      rows.push(row);
      row = [];
    }
  }

  if (row.length > 0) {
    while (row.length < 7) {
      row.push("");
    }
    rows.push(row);
  }

  consola.log("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
  consola.log(rows);
};
