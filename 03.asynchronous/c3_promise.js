import sqlite3 from "sqlite3";
import { run, get } from "./sqlite_utils.js";

const bookTitles = ["booktitle_01", "booktitle_02", "booktitle_03"];
const db = new sqlite3.Database(":memory:");

run(
  db,
  `CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
  )`,
)
  .then(() => {
    let promise = Promise.resolve();

    bookTitles.forEach((title) => {
      promise = promise
        .then(() =>
          run(db, "INSERT INTO books (title) VALUES (?)", [title]).then(() =>
            console.log(`ADD TITLE: ${title}`),
          ),
        )
        .then(() =>
          get(db, "SELECT * FROM books WHERE title = ?", [title]).then(
            (book) => {
              console.log(`GET TITLE: ${book.title}, ID: ${book.id}`);
            },
          ),
        );
    });

    return promise;
  })
  .then(() => run(db, "DROP TABLE books"))
  .then(() => db.close());
