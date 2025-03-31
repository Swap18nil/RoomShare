const roomService = require("../services/roomService");

const getRooms = async (req, res) => {
    try {
        const rooms = await roomService.getAllRooms();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Error fetching rooms", error: error.message });
    }
};

const addRoom = async (req, res) => {

    try {
        const { id, title, description,address, city, type, price, preference,ber, images,userId } = req.body;
        // if (!fullName || !email || !password) {
        //     return res.status(400).json({ message: "Email and Password are required" });
        // }

        const response = await roomService.addRoom(id, title, description,address, city, type, price, preference,ber, images,userId);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteRoom = async (req, res) => {

    try {
        const { id } = req.params;
        const response = await roomService.deleteRoom(id);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateRoom = async (req, res) => {

    try {
        const { id } = req.params;
        const { title, description, address, city, type, price, preference, ber, images, userId } = req.body; 
        const response = await roomService.updateRoom(id, title, description,address, city, type, price, preference,ber, images,userId);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getRooms, addRoom, deleteRoom, updateRoom };
