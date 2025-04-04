const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization");
    // if (!token) {
    //     return res.status(401).json({ message: "Access denied, token missing" });
    // }

    try {
        // const verified = jwt.verify(token, "abc");
        // req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = { authenticateToken };
