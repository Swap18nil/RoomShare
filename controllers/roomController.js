const roomService = require("../services/roomService");

const getRooms = async (req, res) => {
    try {
        const rooms = await roomService.getAllRooms();
        res.set('Cache-Control', 'no-store'); // This header tells the browser not to cache the response.
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Error fetching rooms", error: error.message });
    }
};

const addRoom = async (req, res) => {

    try {
        const {  title, description,address, city, type, price, preference,ber, images,userId } = req.body;
        // if (!fullName || !email || !password) {
        //     return res.status(400).json({ message: "Email and Password are required" });
        // }

        const response = await roomService.addRoom( title, description,address, city, type, price, preference,ber, images,userId);
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

const getOwnerPost = async (req, res) => {
    const { userId } = req.params;
    try {
        const rooms = await roomService.getOwnerPost(userId);
        res.set('Cache-Control', 'no-store'); // This header tells the browser not to cache the response.
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Error fetching rooms", error: error.message });
    }
};

const addBooking = async (req, res) => {
    try {
        const {  userId, roomId, fullName, emailAddress, phoneNumber, specialRequests } = req.body;
        const response = await roomService.addBooking( userId, roomId, fullName, emailAddress, phoneNumber, specialRequests);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const removeBooking = async (req, res) => {

    try {
        const { bookingId } = req.params;
        const response = await roomService.removeBooking(bookingId);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllBookings = async (req, res) => {
    const { userId } = req.params;
    try {
        const rooms = await roomService.getAllBookings(userId);
        res.set('Cache-Control', 'no-store'); // This header tells the browser not to cache the response.
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Error fetching rooms", error: error.message });
    }
};

const getBookingRequests = async (req, res) => {
    const { userId } = req.params;
    try {
        const rooms = await roomService.getBookingRequests(userId);
        res.set('Cache-Control', 'no-store'); // This header tells the browser not to cache the response.
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Error fetching rooms", error: error.message });
    }
};

module.exports = { getRooms, addRoom, deleteRoom, updateRoom,getOwnerPost,getAllBookings, getBookingRequests, addBooking, removeBooking };
