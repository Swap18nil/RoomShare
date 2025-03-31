const authService = require("../services/authService");

const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Email and Password are required" });
        }

        const response = await authService.registerUser(fullName, email, password);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password are required" });
        }

        const response = await authService.loginUser(email, password);
        res.json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { register, login };
