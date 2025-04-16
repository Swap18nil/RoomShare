const roomService = require("../services/roomService");
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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
        const { title, description, address, city, type, price, preference, ber, userId } = req.body;
        const imageFiles = req.files; // Files from the request

        // If no files are uploaded, return an error
        if (!imageFiles || imageFiles.length === 0) {
            return res.status(400).json({ message: "No images uploaded." });
        }

        // Map the file paths of uploaded images
        const imagePaths = imageFiles.map(file => `D:/Swapnil/Ms/programming for information systems/Project/Client/room-share-app/src/assets/uploaded-images/${file.filename}`);

        // Call the service to add the room and store the image paths
        const response = await roomService.addRoom(title, description, address, city, type, price, preference, ber, imagePaths, userId);
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

const updateBookingStatus = async (req, res) => {
    const { bookingId } = req.params;
    const {bookingStatus} = req.body
    try {
        const rooms = await roomService.getBookingRequests(bookingId, bookingStatus);
        res.set('Cache-Control', 'no-store'); // This header tells the browser not to cache the response.
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Error fetching rooms", error: error.message });
    }
};

module.exports = { getRooms, addRoom, deleteRoom, updateRoom,getOwnerPost,getAllBookings, getBookingRequests, addBooking, removeBooking, updateBookingStatus };
