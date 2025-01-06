import sqlite3 from "sqlite3";
import { run, get } from "./sqlite_utils.js";

const bookTitles = ["booktitle_01", "booktitle_01", "booktitle_02"];
const db = new sqlite3.Database(":memory:");

const main = async () => {
  await run(
    db,
    `CREATE TABLE books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL UNIQUE
    )`,
  );

  for (const title of bookTitles) {
    try {
      await run(db, "INSERT INTO books (title) VALUES (?)", [title]);
      console.log(`ADD TITLE: ${title}`);
    } catch (err) {
      console.error(`ADD TITLE: ${title}, ${err.message}`);
    }

    try {
      const book = await get(
        db,
        "SELECT * FROM NotExistTable WHERE title = ?",
        [title],
      );
      console.log(`GET TITLE: ${book.title}, ID: ${book.id}`);
    } catch (err) {
      console.error(`GET TITLE: ${title}, ${err.message}`);
    }
  }

  await run(db, "DROP TABLE books");
  db.close();
};

main();
