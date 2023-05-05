import userQueries from "./user_queries.js";

const dao = {};

dao.addUser = async (userData) => await userQueries.addUser(userData);
dao.userData = async () => await userQueries.userData();
dao.getUserByEmail = async (email) => await userQueries.getUserByEmail(email);

export default dao;
