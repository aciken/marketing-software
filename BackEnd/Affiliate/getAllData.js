const User = require('../DataBase/mongoDB');

const getAllData = async (req, res) => {
    const { id } = req.body;

    const user = await User.findOne({ email: id });

    if(user){
        res.json(user);
    } else{
        res.json({message: 'User not found'})
    }
}

module.exports = getAllData;