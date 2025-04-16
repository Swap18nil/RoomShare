const db = require("../database/db");

const getAllRooms = async () => {
    const [rooms] = await db.query("SELECT * FROM rooms");
    return rooms;
};

const addRoom = async ( title, description,address, city, type, price, preference,ber, images,userId) => {
    const imagesJson = JSON.stringify(images); // Convert image paths array to JSON

    // Insert room details along with image paths
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

const addBooking = async ( userId, roomId, fullName, emailAddress, phoneNumber, specialRequests) =>{
    await db.query(
        "INSERT INTO bookings (userId, roomId, fullName, emailAddress, phoneNumber, specialRequests) VALUES (?, ?, ?, ?, ?, ?)", 
        [userId, roomId, fullName, emailAddress, phoneNumber, specialRequests]
    );

}

const getAllBookings = async (UserId) => {
    const [bookings] = await db.query(
        `SELECT 
            r.id,
            r.title,
            r.description,
            r.address,
            r.city,
            r.type,
            r.price,
            r.preference,
            r.ber,
            r.images,
            r.userId,
            b.bookingId
        FROM bookings b
        INNER JOIN rooms r ON b.roomId = r.id
        WHERE b.userId = ?`,UserId);
    
      return bookings;
};

const removeBooking = async (bookingId) => {
    await db.query(
        "DELETE FROM bookings WHERE  bookingId =? ", [parseInt(bookingId)]
    );
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
    b.bookingDate,
    b.bookingStatus
    FROM bookings b
    JOIN rooms r ON b.roomId = r.id
    WHERE r.userId = ? `,UserId);
    return rooms;
};

const updateBookingStatus = async (booingId, bookingStatus)=>{
    await db.query(
        `UPDATE bookings 
         SET bookingStatus = ?, 
         WHERE bookingId = ?`, 
        [bookingStatus, bookingId]
    );
}



module.exports = { getAllRooms, addRoom, deleteRoom, updateRoom, getOwnerPost, getAllBookings, getBookingRequests, addBooking, removeBooking, updateBookingStatus };
