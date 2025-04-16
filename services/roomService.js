const roomRepository = require("../DAL/roomsData");

const getAllRooms = async () => {
    return await roomRepository.getAllRooms();
};

const addRoom = async ( title, description,address, city, type, price, preference,ber, images,userId) =>{
    const imagesJson = JSON.stringify(images); 

    // Add the room to the database with image paths
    await roomRepository.addRoom(title, description, address, city, type, price, preference, ber, imagesJson, userId);
    return { message: "Room Added Successfully" };
}

const deleteRoom = async (id) =>{
    await roomRepository.deleteRoom(id);
    return { message: "Room Deleted Succesfully" };
}

const updateRoom = async (id, title, description,address, city, type, price, preference,ber, images,userId) =>{
    await roomRepository.updateRoom(id, title, description,address, city, type, price, preference,ber, images,userId);
    return { message: "Room updated Succesfully" };
}

const getOwnerPost = async (userId) =>{
    return await roomRepository.getOwnerPost(userId);
}

const addBooking = async ( userId, roomId, fullName, emailAddress, phoneNumber, specialRequests) =>{
    return await roomRepository.addBooking( userId, roomId, fullName, emailAddress, phoneNumber, specialRequests);
}

const removeBooking = async (bookingId) =>{
    await roomRepository.removeBooking(bookingId);
    return { message: "Booking Removed Succesfully" };
}
const getAllBookings = async (userId) =>{
    return await roomRepository.getAllBookings(userId);
}

const getBookingRequests = async (userId) =>{
    return await roomRepository.getBookingRequests(userId);
}

const updateBookingStatus = async (bookingStatus, bookingId) =>{
    return await roomRepository.updateBookingStatus(bookingStatus,bookingId);
}

module.exports = { getAllRooms, addRoom, deleteRoom, updateRoom, getOwnerPost, getAllBookings, getBookingRequests, addBooking, removeBooking, updateBookingStatus };
