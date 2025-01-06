import sqlite3 from "sqlite3";

const bookTitles = ["booktitle_01", "booktitle_02", "booktitle_03"];
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
    await new Promise((resolve) => {
      db.run("INSERT INTO books (title) VALUES (?)", [title], resolve);
    });
    console.log(`ADD TITLE: ${title}`);

    const book = await new Promise((resolve) => {
      db.get("SELECT * FROM books WHERE title = ?", [title], (_, book) =>
        resolve(book),
      );
    });
    console.log(`GET TITLE: ${book.title}, ID: ${book.id}`);
  }

  await new Promise((resolve) => {
    db.run("DROP TABLE books", () => {
      db.close();
      resolve();
    });
  });
};

main();
