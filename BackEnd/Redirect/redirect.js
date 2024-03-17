const User = require('../DataBase/mongoDB');

const redirectUser = async (req, res) => {
    const {id, index, userID} = req.body;

    const user = await User.findOne({
        userAffiliateID: id
    });

    if(user){
        console.log(`User found: ${user}`);
        console.log(`Looking for affiliate user with genKey: ${userID} in:`, user.links[index].affiliateUsers);
        const affiliateUser = user.links[index].affiliateUsers.find(user => user.genKey === userID);
        if(affiliateUser){
            console.log(`Affiliate user found: ${affiliateUser}`);
            res.json(affiliateUser);
        } else{
            console.log(`Affiliate user not found`);
            res.json({message: 'User not found'})
        }
    } else {
        console.log(`User with userAffiliateID ${id} not found`);
    }
}

module.exports = redirectUser;