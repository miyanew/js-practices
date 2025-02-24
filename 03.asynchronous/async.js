import sqlite3 from "sqlite3";
import { run, get, close } from "./sqlite_utils.js";

const bookTitle = "booktitle_01";
const db = new sqlite3.Database(":memory:");

await run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);

const result = await run(db, "INSERT INTO books (title) VALUES (?)", [
  bookTitle,
]);
console.log(`ADD TITLE: ${bookTitle}, ID: ${result.lastID}`);

const book = await get(db, "SELECT * FROM books WHERE title = ?", [bookTitle]);
console.log(`GET TITLE: ${book.title}, ID: ${book.id}`);

await run(db, "DROP TABLE books");

await close(db);
