const User = require('../DataBase/mongoDB');

const addMail = async (req, res) => {
    const { email, id } = req.body;

    try {
        const user = await User.findOne({ email:id });
        if(user){
            user.sendEmails.push(email);
            await user.save();
            res.json({message: 'Email added'});
        } else {
            res.json({message: 'User not found'});
        }
    }   catch (error) {
        res.json({message: 'Error'});
    }
}

module.exports = addMail;