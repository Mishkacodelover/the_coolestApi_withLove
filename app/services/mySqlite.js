import sqlite3 from "sqlite3";

const sqlite = sqlite3.verbose();

const db = new sqlite.Database(
  "./database.sqlite",

  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Conected to SQLite DataBase");
    }
  }
);

export default db;
