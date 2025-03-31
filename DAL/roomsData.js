const db = require("../database/db");

const getAllRooms = async () => {
    const [rooms] = await db.query("SELECT * FROM rooms");
    return rooms;
};

module.exports = { getAllRooms };
