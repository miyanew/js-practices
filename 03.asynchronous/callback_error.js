import sqlite3 from "sqlite3";

const bookTitle = "booktitle_01";
const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run(
      "INSERT INTO NotExistTable (title) VALUES (?)",
      [bookTitle],
      function (err) {
        if (err) {
          console.error(`ADD TITLE: ${bookTitle}, ${err.message}`);
        } else {
          console.log(`ADD TITLE: ${bookTitle}, ID: ${this.lastID}`);
        }

        db.get(
          "SELECT * FROM NotExistTable WHERE title = ?",
          [bookTitle],
          (err, book) => {
            if (err) {
              console.error(`GET TITLE: ${bookTitle}, ${err.message}`);
            } else {
              console.log(`GET TITLE: ${book.title}, ID: ${book.id}`);
            }

            db.run("DROP TABLE books", () => {
              db.close();
            });
          },
        );
      },
    );
  },
);
