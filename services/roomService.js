const roomRepository = require("../DAL/roomsData");

const getAllRooms = async () => {
    return await roomRepository.getAllRooms();
};

const addRoom = async (id, title, description,address, city, type, price, preference,ber, images,userId) =>{
    await roomRepository.addRoom(id,title, description,address, city, type, price, preference,ber, images,userId);
    return { message: "Room Added Succesfully" };
}

const deleteRoom = async (id) =>{
    await roomRepository.deleteRoom(id);
    return { message: "Room Deleted Succesfully" };
}

const updateRoom = async (id, title, description,address, city, type, price, preference,ber, images,userId) =>{
    await roomRepository.updateRoom(id, title, description,address, city, type, price, preference,ber, images,userId);
    return { message: "Room updated Succesfully" };
}

module.exports = { getAllRooms, addRoom, deleteRoom, updateRoom };
