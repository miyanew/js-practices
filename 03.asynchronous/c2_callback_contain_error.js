import sqlite3 from "sqlite3";

const bookTitles = ["booktitle_01", "booktitle_02", "booktitle_02"];
const db = new sqlite3.Database(":memory:");

db.run(
  `CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
  )`,
  () => {
    let index = 0;

    bookTitles.forEach((title) => {
      db.run("INSERT INTO books (title) VALUES (?)", [title], (err) => {
        if (err) {
          console.error(`ADD TITLE: ${title}, ${err.message}`);
        } else {
          console.log(`ADD TITLE: ${title}`);
        }

        db.get("SELECT * FROM NotExistTable WHERE title = ?", [title], (err, book) => {
          if (err) {
            console.error(`GET TITLE: ${title}, ${err.message}`);
          } else {
            console.log(`GET TITLE: ${book.title}, ID: ${book.id}`);
          }
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
