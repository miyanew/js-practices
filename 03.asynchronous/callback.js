import sqlite3 from "sqlite3";

const bookTitle = "booktitle_01";
const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run("INSERT INTO books (title) VALUES (?)", [bookTitle], function () {
      console.log(`ADD TITLE: ${bookTitle}, ID: ${this.lastID}`);

      db.get("SELECT * FROM books WHERE title = ?", [bookTitle], (_, book) => {
        console.log(`GET TITLE: ${book.title}, ID: ${book.id}`);

        db.run("DROP TABLE books", () => {
          db.close();
        });
      });
    });
  },
);
