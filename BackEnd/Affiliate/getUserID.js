const User = require('../DataBase/mongoDB');

const getDataFromUserID = async (req, res) => {
    const {id} = req.body;

    const user = await User.findOne({ 
        email: id });

        if(user){
            res.json(user.userAffiliateID);
        }
}

module.exports = getDataFromUserID;