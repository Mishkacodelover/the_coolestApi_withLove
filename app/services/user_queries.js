import db from "./mySqlite.js";
import md5 from "md5";

const userQueries = {};

userQueries.addUser = async (userData) => {
  try {
    const sql = `INSERT INTO user (nombre,email,password,padre,tipo,numserie) VALUES (?, ?, ?, ?, ?, ?)`;
    const passwordHash = md5(userData.password);
    db.run(sql, [
      userData.nombre,
      userData.email,
      passwordHash,
      userData.padre,
      userData.tipo,
      userData.numserie,
    ]);
    console.log(
      `User ${userData.nombre} with email: ${userData.email} has been registered successfully`
    );
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

userQueries.getUserByEmail = async (email) => {
  try {
    const sql = `SELECT * FROM user WHERE email = ?`;
    const rows = await new Promise((res, req) => {
      db.all(sql, [email], (err, rows) => {
        if (err) {
          req(err);
        } else {
          res(rows);
        }
      });
    });
    return rows;
  } catch (e) {
    throw new Error(e);
  }
};

userQueries.userData = async () => {
  try {
    const sql = `SELECT * FROM user ORDER by padre DESC , tipo DESC , numserie DESC`;
    const rows = await new Promise((res, req) => {
      db.all(sql, [], (err, rows) => {
        if (err) {
          req(err);
        } else {
          res(rows);
        }
        console.log(rows);
      });
    });
    return rows;
  } catch (e) {
    throw new Error(e);
  }
};

export default userQueries;
