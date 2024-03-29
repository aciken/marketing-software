const User = require('../DataBase/mongoDB');

const removeUser = async (req, res) => {
    const {id, index, userEmail} = req.body;
    try {
        const user = await User.findOne({email: id});
        if(user){
            const link = user.links[index];
            if(link){
                const affiliateUserIndex = link.affiliateUsers.findIndex(user => user.userEmail === userEmail);
                if(affiliateUserIndex !== -1){
                    link.affiliateUsers.splice(affiliateUserIndex, 1);
                    user.markModified('links');
                    try {
                        await user.save();
                        res.status(200).send('User removed');
                    }
                    catch (error) {
                        console.error(error);
                        res.status(500).send('Server error');
                    }
                } else {
                    res.status(400).send('Affiliate user not found');
                }
            } else {
                res.status(400).send('Link not found');
            }
        } else {
            res.status(400).send('User not found')
        }      
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

module.exports = removeUser;