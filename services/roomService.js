const roomRepository = require("../DAL/roomsData");

const getAllRooms = async () => {
    return await roomRepository.getAllRooms();
};

module.exports = { getAllRooms };
