const User = require("../DataBase/mongoDB");

function generateFourDigitNumber() {
    return Math.floor(1000 + Math.random() * 9000);
}

const signup = async (req, res) => {
    const { email, password } = req.body;

    const verifyCode = generateFourDigitNumber();
    
    const user = new User({
        email,
        password,
        verify: verifyCode
    });
    
    try {

        check = await User.findOne({ email});
        if (check) {
            res.json({ message: "exist" });
        } else{
            const newUser = await user.save();
            res.json(newUser);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });

        if(user){
            res.json({message: "success"});
        } else{
            res.json({message: "failed"});
        }
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {signup, login};
