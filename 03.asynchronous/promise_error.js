import sqlite3 from "sqlite3";
import { run, get, close } from "./sqlite_utils.js";

const bookTitle = "booktitle_01";
const db = new sqlite3.Database(":memory:");

run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() =>
    run(db, "INSERT INTO NotExistTable (title) VALUES (?)", [bookTitle]),
  )
  .then((result) => {
    console.log(`ADD TITLE: ${bookTitle}, ID: ${result.lastID}`);
  })
  .catch((err) => {
    console.error(`ADD TITLE: ${bookTitle}, ${err.message}`);
  })
  .then(() => {
    return get(db, "SELECT * FROM NotExistTable WHERE title = ?", [bookTitle]);
  })
  .then((book) => {
    console.log(`GET TITLE: ${book.title}, ID: ${book.id}`);
  })
  .catch((err) => {
    console.error(`GET TITLE: ${bookTitle}, ${err.message}`);
  })
  .then(() => run(db, "DROP TABLE books"))
  .then(() => close(db));
