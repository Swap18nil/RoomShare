const express = require("express");
const cors = require("cors");
const { authenticateToken } = require("./commonAuth/authentication");
const authController = require("./controllers/authController");
const roomController = require("./controllers/roomController");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'D:/Swapnil/Ms/programming for information systems/Project/Client/room-share-app/src/assets/uploaded-images'); // Destination folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Set the file name
    }
});

const upload = multer({ storage: storage });

// Routes
// user routes
app.post("/register", authController.register);
app.post("/login", authController.login);

// Room/accomodation routes
app.get("/rooms", authenticateToken, roomController.getRooms);
app.post("/rooms",upload.array('images', 5),roomController.addRoom)
app.delete("/rooms/:id",roomController.deleteRoom)
app.put("/rooms/:id",roomController.updateRoom)
app.get("/ownerPost/:userId",roomController.getOwnerPost)
// Booking Routes
app.post("/bookings",roomController.addBooking)
app.get("/bookings/:userId",roomController.getAllBookings)
app.delete("/bookings/:bookingId",roomController.removeBooking)
app.get("/bookingRequests/:userId",roomController.getBookingRequests)
app.put("/bookingRequests/:bookingId",roomController.updateBookingStatus)

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
