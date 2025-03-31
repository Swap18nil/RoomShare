const db = require("../database/db");

const getUserByEmail = async (email) => {
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return user.length ? user[0] : null;
};

const createUser = async (fullName, email, hashedPassword) => {
    await db.query("INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)", [fullName, email, hashedPassword]);
};

module.exports = { getUserByEmail, createUser };
