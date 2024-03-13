const User = require("../DataBase/mongoDB");

const verify = async (req, res) => {
    const { email, verificationCode } = req.body;
    try {
        const user = await User.findOne({ email, verify: verificationCode });
        if (user) {
            res.json({ message: "success" });
            user.verify = 1;
            try {
                await user.save();
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        } else {
            res.json({ message: "failed" });
        }
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = verify;
