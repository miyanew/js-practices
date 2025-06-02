import sqlite3 from "sqlite3";
import { run, get, close } from "./sqlite_utils.js";

const bookTitle = "booktitle_01";
const db = new sqlite3.Database(":memory:");

await run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);

try {
  const result = await run(db, "INSERT INTO NotExistTable (title) VALUES (?)", [
    bookTitle,
  ]);
  console.log(`ADD TITLE: ${bookTitle}, ID: ${result.lastID}`);
} catch (err) {
  if (err instanceof Error && err.code === "SQLITE_ERROR") {
    console.error(`ADD TITLE: ${bookTitle}, ${err.message}`);
  } else {
    throw err;
  }
}

try {
  const book = await get(db, "SELECT * FROM NotExistTable WHERE title = ?", [
    bookTitle,
  ]);
  console.log(`GET TITLE: ${book.title}, ID: ${book.id}`);
} catch (err) {
  if (err instanceof Error && err.code === "SQLITE_ERROR") {
    console.error(`GET TITLE: ${bookTitle}, ${err.message}`);
  } else {
    throw err;
  }
}

await run(db, "DROP TABLE books");

await close(db);
