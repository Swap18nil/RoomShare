const db = require("../database/db");

const getAllRooms = async () => {
    const [rooms] = await db.query("SELECT * FROM rooms");
    return rooms;
};

const addRoom = async ( title, description,address, city, type, price, preference,ber, images,userId) => {
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

const getOwnerPost = async ( userId ) => {
    const [rooms] = await db.query("SELECT * FROM rooms WHERE userid = ? ",userId);
    return rooms;
};

const getAllBookings = async (UserId) => {
    const [rooms] = await db.query("SELECT * FROM bookings WHERE userid = ? ",UserId);
    return rooms;
};

const getBookingRequests = async (UserId) => {
    const [rooms] = await db.query(`SELECT 
    b.bookingId, 
    b.userId, 
    b.roomId, 
    b.fullName, 
    b.emailAddress, 
    b.phoneNumber, 
    b.specialRequests, 
    b.bookingDate
    FROM bookings b
    JOIN rooms r ON b.roomId = r.id
    WHERE r.userId = ? `,UserId);
    return rooms;
};




module.exports = { getAllRooms, addRoom, deleteRoom, updateRoom, getOwnerPost, getAllBookings, getBookingRequests };
