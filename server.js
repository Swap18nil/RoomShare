const express = require("express");
const cors = require("cors");
const { authenticateToken } = require("./commonAuth/authentication");
const authController = require("./controllers/authController");
const roomController = require("./controllers/roomController");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.post("/register", authController.register);
app.post("/login", authController.login);
app.get("/rooms", authenticateToken, roomController.getRooms);
app.post("/rooms",roomController.addRoom)
app.delete("/rooms/:id",roomController.deleteRoom)
app.put("/rooms/:id",roomController.updateRoom)
app.get("/ownerPost/:userId",roomController.getOwnerPost)
app.get("/bookings/:userId",roomController.getAllBookings)
app.get("/bookingRequests/:userId",roomController.getBookingRequests)

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
