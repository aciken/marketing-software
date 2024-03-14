const User = require('../DataBase/mongoDB');

const getLinks = async (req, res) => {
    const { id } = req.body;

    const user = await User.findOne({ email: id });

    if(user){
        res.json(user.links);
    } else{
        res.json({message: 'User not found'})
    }
}

module.exports = getLinks;