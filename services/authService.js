const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../DAL/userData");

const registerUser = async (fullName, email, password) => {
    const existingUser = await userRepository.getUserByEmail(email);
    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userRepository.createUser(fullName, email, hashedPassword);
    return { message: "User registered successfully" };
};

const loginUser = async (email, password) => {
    const user = await userRepository.getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, "your_jwt_secret", { expiresIn: "1h" });
    return { token, id: user.id, message: "Login successful" };
};

module.exports = { registerUser, loginUser };
