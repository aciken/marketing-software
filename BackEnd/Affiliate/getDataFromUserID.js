const User = require('../DataBase/mongoDB');

const getDataFromUserID = async (req, res) => {
    const {id, name, index} = req.body;

    const user = await User.findOne({ 
        userAffiliateID: id
});

    if(user){
        res.json(user.links[index]);
    } else{
        res.json({message: 'User not found'})
    }
}

module.exports = getDataFromUserID;