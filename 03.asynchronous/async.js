import sqlite3 from "sqlite3";
import { run, get, close } from "./sqlite_utils.js";

const bookTitles = ["booktitle_01", "booktitle_02", "booktitle_03"];
const db = new sqlite3.Database(":memory:");

await run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);

for (const title of bookTitles) {
  const result = await run(db, "INSERT INTO books (title) VALUES (?)", [title]);
  console.log(`ADD TITLE: ${title}, ID: ${result.lastID}`);

  const book = await get(db, "SELECT * FROM books WHERE title = ?", [title]);
  console.log(`GET TITLE: ${book.title}, ID: ${book.id}`);
}

await run(db, "DROP TABLE books");

await close(db);
