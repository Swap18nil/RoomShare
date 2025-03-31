const db = require("../database/db");

const getAllRooms = async () => {
    const [rooms] = await db.query("SELECT * FROM rooms");
    return rooms;
};

const addRoom = async ( title, description,address, city, type, price, preference,ber, images,userId) => {
    // await db.query("INSERT INTO rooms (id, title, description,address, city, type, price, preference,ber, images,userId) VALUES (?, ?, ?, ?, ?, ?,?, ?, ?,?,?)", [ id,title, description,address, city, type, price, preference,ber, images,userId]);
    const imagesJson = JSON.stringify(images); 

    await db.query(
        "INSERT INTO rooms (title, description, address, city, type, price, preference, ber, images, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        [title, description, address, city, type, price, preference, ber, imagesJson, userId]
    );
};

const deleteRoom = async ( id) => {

    await db.query(
        "DELETE FROM rooms WHERE  id =? ", id
    );
};

const updateRoom = async ( id, title, description,address, city, type, price, preference,ber, images,userId) => {
    const imagesJson = JSON.stringify(images);

    await db.query(
        `UPDATE rooms 
         SET title = ?, 
             description = ?, 
             address = ?, 
             city = ?, 
             type = ?, 
             price = ?, 
             preference = ?, 
             ber = ?, 
             images = ?, 
             userId = ? 
         WHERE id = ?`, 
        [title, description, address, city, type, price, preference, ber, imagesJson, userId, id]
    );
};

module.exports = { getAllRooms, addRoom, deleteRoom, updateRoom };
