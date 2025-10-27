const User = require("../models/User");

async function getSecurityQuestion(email) {
    const user = await User.findOne({ email });
    return user ? user.securityQuestion : null;
}

module.exports = {
    getSecurityQuestion
};