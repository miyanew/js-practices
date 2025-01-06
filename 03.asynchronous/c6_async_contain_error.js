import sqlite3 from "sqlite3";

const bookTitles = ["booktitle_01", "booktitle_01", "booktitle_02"];
const db = new sqlite3.Database(":memory:");

const main = async () => {
  await new Promise((resolve) => {
    db.run(
      `CREATE TABLE books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL UNIQUE
       )`,
      resolve,
    );
  });

  for (const title of bookTitles) {
    try {
      await new Promise((resolve, reject) => {
        db.run("INSERT INTO books (title) VALUES (?)", [title], (err) => {
          if (err) {
            reject(err);
          } else {
            console.log(`ADD TITLE: ${title}`);
            resolve();
          }
        });
      });
    } catch (err) {
      console.error(`ADD TITLE: ${title}, ${err.message}`);
      continue;
    }

    try {
      await new Promise((resolve, reject) => {
        db.get(
          "SELECT * FROM NotExistTable WHERE title = ?",
          [title],
          (err, book) => {
            if (err) {
              reject(err);
            } else {
              console.log(`GET TITLE: ${book.title}, ID: ${book.id}`);
              resolve(book);
            }
          },
        );
      });
    } catch (err) {
      console.error(`GET TITLE: ${title}, ${err.message}`);
    }
  }

  await new Promise((resolve) => {
    db.run("DROP TABLE books", () => {
      db.close();
      resolve();
    });
  });
};

main();
