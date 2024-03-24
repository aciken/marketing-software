const User = require('../DataBase/mongoDB');

const oneData = async (req, res) => {
    const {id, index} = req.body;

    const user = await User.findOne({ 
        email: id });

    if(user){
        res.json(user.links[index]);
    }
}

module.exports = oneData;