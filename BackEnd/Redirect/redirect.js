const User = require('../DataBase/mongoDB');

const redirectUser = async (req, res) => {
    const {id, index, userID} = req.body;

    const user = await User.findOne({
        userAffiliateID: id
    });

    if(user){
        console.log(userID)
        const affiliateUser = user.links[index].affiliateUsers.find(user => user.genKey === userID);
        if(affiliateUser){
            console.log(`Affiliate user found: ${affiliateUser}`);
            res.json(affiliateUser);
            affiliateUser.redirects++;
            user.markModified('links');
            await user.save();
        } else{
            console.log(`Affiliate user not found`);
            res.json({message: 'User not found'})
        }
    } else {
        console.log(`User with userAffiliateID ${id} not found`);
    }
}

module.exports = redirectUser;