import sqlite3 from "sqlite3";

const sqlite = sqlite3.verbose();

const db = new sqlite.Database(
  "./database.sqlite",

  (err) => {
    if (err) return console.error(err);
  }
);

const sql =
  "CREATE TABLE user(ID INTEGER PRIMARY KEY, nombre, email, password,padre,tipo,numserie)";
db.run(sql);
