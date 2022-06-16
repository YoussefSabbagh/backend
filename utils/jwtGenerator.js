require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtGenerator = (user_id) => {
    const payload = {
        user: user_id
    }

    return jwt.sign(payload, process.env.jwtSecrect, {expiresIn: "1hr"})
}

module.exports = jwtGenerator;