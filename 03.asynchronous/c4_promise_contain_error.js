import sqlite3 from "sqlite3";

const bookTitles = ["booktitle_01", "booktitle_01", "booktitle_02"];
const db = new sqlite3.Database(":memory:");

new Promise((resolve) => {
  db.run(
    `CREATE TABLE books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL UNIQUE
    )`,
    resolve,
  );
})
  .then(() => {
    let promise = Promise.resolve();

    bookTitles.forEach((title) => {
      promise = promise
        .then(() => {
          return new Promise((resolve) => {
            db.run("INSERT INTO books (title) VALUES (?)", [title], (err) => {
              if (err) {
                console.error(`ADD TITLE: ${title}, ${err.message}`);
              } else {
                console.log(`ADD TITLE: ${title}`);
              }
              resolve();
            });
          });
        })
        .then(() => {
          return new Promise((resolve) => {
            db.get(
              "SELECT * FROM NotExistTable WHERE title = ?",
              [title],
              (err, book) => {
                if (err) {
                  console.error(`GET TITLE: ${title}, ${err.message}`);
                } else {
                  console.log(`GET TITLE: ${book.title}, ID: ${book.id}`);
                }
                resolve();
              },
            );
          });
        });
    });

    return promise;
  })
  .then(() => {
    return new Promise((resolve) => {
      db.run("DROP TABLE books", () => {
        db.close();
        resolve();
      });
    });
  });
