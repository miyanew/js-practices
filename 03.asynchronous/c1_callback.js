import sqlite3 from "sqlite3";

const bookTitles = ["booktitle_01", "booktitle_02", "booktitle_03"];
const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    let index = 0;

    bookTitles.forEach((title) => {
      db.run("INSERT INTO books (title) VALUES (?)", [title], function () {
        console.log(`ADD TITLE: ${title}, ID: ${this.lastID}`);

        db.get("SELECT * FROM books WHERE title = ?", [title], (_, book) => {
          console.log(`GET TITLE: ${book.title}, ID: ${book.id}`);
          index++;

          if (index >= bookTitles.length) {
            db.run("DROP TABLE books", () => {
              db.close();
            });
          }
        });
      });
    });
  },
);
